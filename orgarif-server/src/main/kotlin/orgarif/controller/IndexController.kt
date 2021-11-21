package orgarif.controller

import orgarif.config.Routes
import orgarif.domain.ApplicationBootstrapData
import orgarif.domain.UserInfos
import orgarif.service.ApplicationInstance
import orgarif.service.LocaleService
import orgarif.service.user.MagicLinkTokenService
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionService
import orgarif.serialization.Serializer.serialize
import freemarker.ext.beans.BeansWrapperBuilder
import freemarker.template.Configuration
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView
import orgarif.domain.OrganismeCategories
import orgarif.repository.*
import java.io.File
import java.net.URLEncoder
import java.nio.file.Files
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Controller
class IndexController(
    @Value("\${assets.browserWebpackDevHost}") val assetsBrowserWebpackDevHost: String,
    @Value("\${assets.useBuildFiles}") val assetsUseBuildFiles: Boolean,

    val userDao: UserDao,
    val secteurDao: SecteurDao,
    val natureJuridiqueDao: NatureJuridiqueDao,
    val typeStructureDao: TypeStructureDao,
    val eluDao: EluDao,

    val localeService: LocaleService,
    val userService: UserService,
    val applicationInstance: ApplicationInstance,
    val magicLinkTokenService: MagicLinkTokenService,
    val userSessionService: UserSessionService
) {

    companion object {
        const val magicTokenParameterName = "magicToken"

        val statics = BeansWrapperBuilder(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS).build().staticModels
    }

    val buildAssets by lazy {
        File(System.getProperty("user.dir") + "/asset-manifest.json")
            .let { Files.readString(it.toPath()) }
            .let { JSONObject(it ?: throw RuntimeException()) }
            .let { it.getJSONArray("entrypoints") }
            .map { "/$it" }
    }
    val jsAssets by lazy {
        if (assetsUseBuildFiles) {
            buildAssets.filter { it.endsWith(".js") }
        } else {
            listOf("bundle.js", "vendors~main.chunk.js", "main.chunk.js")
                .map { "$assetsBrowserWebpackDevHost/static/js/$it" }
        }
    }
    val cssAssets by lazy {
        if (assetsUseBuildFiles) {
            buildAssets.filter { it.endsWith(".css") }
        } else {
            emptyList()
        }
    }

    @GetMapping(Routes.logout)
    fun redirect() = "redirect:${Routes.root}"

    @GetMapping(Routes.root, "/**/{path:[^\\.]*}")
    fun index(request: HttpServletRequest, response: HttpServletResponse, mav: ModelAndView): ModelAndView {
        val magicToken = request.getParameter(magicTokenParameterName)
        if (magicToken != null) {
            val queryString = rewriteQueryString(request.parameterMap)
            magicLinkTokenService.connectUser(magicToken, request, response)
            return ModelAndView(
                "redirect:" + request.requestURI +
                        if (queryString.isNotBlank()) "?$queryString" else ""
            )
        }
        val userInfos = if (userSessionService.isAuthenticated()) {
            val userSession = userSessionService.getUserSession()
            val user = userDao.fetch(userSession.userId)
                ?: throw IllegalStateException("$userSession")
            UserInfos.fromUser(user)
        } else null
        val categories = OrganismeCategories(
            secteurDao.fetchAll(), natureJuridiqueDao.fetchAll(),
            typeStructureDao.fetchAll()
        )
        val elus = eluDao.fetchAll()
        mav.model["bootstrapData"] =
            serialize(ApplicationBootstrapData(applicationInstance.env, userInfos, categories, elus))
        mav.model["deploymentId"] = applicationInstance.deploymentId.rawId
        mav.model["gitRevisionLabel"] = applicationInstance.gitRevisionLabel
        mav.model["jsAssets"] = jsAssets
        mav.model["cssAssets"] = cssAssets
        mav.model["statics"] = statics
        mav.viewName = "index"
        return mav
    }

    fun rewriteQueryString(parameterMap: Map<String, Array<String>>): String {
        val params = parameterMap.keys
            .filter { it != magicTokenParameterName }
        return if (params.isEmpty()) {
            ""
        } else {
            params
                .flatMap { paramName ->
                    // TODO[fmk] works correctly ? is needed ?
                    // srsly test & compare with UriEncoder
                    // + test smthg= (with emtpy string)
                    val paramValues = parameterMap.getValue(paramName)
                    paramValues.map {
                        URLEncoder.encode(paramName, Charsets.UTF_8.name()) + "=" +
                                URLEncoder.encode(it, Charsets.UTF_8.name())
                    }
                }.reduce { acc, s -> acc + "&" + s }
        }
    }
}


