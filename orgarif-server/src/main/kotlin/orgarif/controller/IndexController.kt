package orgarif.controller

import freemarker.ext.beans.BeansWrapperBuilder
import freemarker.template.Configuration
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView
import orgarif.domain.ApplicationBootstrapData
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.OrganismeCategories
import orgarif.domain.UserInfos
import orgarif.repository.sql.*
import orgarif.service.ApplicationInstance
import orgarif.service.LocaleService
import orgarif.service.user.MagicLinkTokenService
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionHelper
import orgarif.utils.Serializer.serialize
import java.net.URLEncoder
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Controller
class IndexController(
        @Value("\${webpack.devHost}") val webpackDevHost: String,
        @Value("\${webpack.bundleUrlBase}") val webpackBundleUrlBase: String,
        @Value("\${webpack.bundleFiles}") val webpackBundleFiles: String,

        val userDao: UserDao,
        val secteurDao: SecteurDao,
        val natureJuridiqueDao: NatureJuridiqueDao,
        val typeStructureDao: TypeStructureDao,
        val eluDao: EluDao,

        val localeService: LocaleService,
        val userService: UserService,
        val applicationInstance: ApplicationInstance,
        val magicLinkTokenService: MagicLinkTokenService) {

    companion object {
        // TODO [] mapping avec front
        const val rootRoute = "/"
        const val loginRoute = "/login"
        const val logoutRoute = "/logout"
        const val loginUpdatePasswordRoute = "/login/mot-de-passe"
        const val newPasswordRoute = "/mot-de-passe-perdu"
        const val magicTokenParameterName = "magicToken"

        val statics = BeansWrapperBuilder(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS).build().staticModels
    }

    @GetMapping(logoutRoute)
    fun redirect() = "redirect:/"

    @GetMapping("/", "/**/{path:[^\\.]*}")
    fun index(request: HttpServletRequest, response: HttpServletResponse, mav: ModelAndView): ModelAndView {
        val magicToken = request.getParameter(magicTokenParameterName)
        if (magicToken != null) {
            val queryString = rewriteQueryString(request.parameterMap)
            magicLinkTokenService.connectUser(magicToken, request, response)
            return ModelAndView("redirect:" + request.requestURI +
                    if (queryString.isNotBlank()) "?$queryString" else "")
        }
        val userInfos = if (UserSessionHelper.isAuthenticated()) {
            val userSession = UserSessionHelper.getUserSession()
            val user = userDao.fetch(userSession.userId)
                    ?: throw IllegalStateException()
            UserInfos.fromUser(user)
        } else null
        val categories = OrganismeCategories(secteurDao.fetchAll(), natureJuridiqueDao.fetchAll(),
                typeStructureDao.fetchAll())
        val elus = eluDao.fetchAll()
        mav.model["bootstrapData"] = serialize(ApplicationBootstrapData(applicationInstance.env, userInfos, categories, elus))
        mav.model["deploymentId"] = applicationInstance.deploymentId.rawId
        mav.model["gitRevisionLabel"] = applicationInstance.gitRevisionLabel
        val jsBundlesHost = if (applicationInstance.env == ApplicationEnvironment.dev) {
            webpackDevHost
        } else {
            request.serverName
        }
        mav.model["bundles"] = webpackBundleFiles.split(",")
                .map { "$jsBundlesHost/$webpackBundleUrlBase/$it" }
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
                        // TODO[fmk] fonctionne bien ? is needed ?
                        // tester serieusement et comparer avec UriEncoder
                        // test prout= chaine vide
                        val paramValues = parameterMap.getValue(paramName)
                        paramValues.map {
                            URLEncoder.encode(paramName, Charsets.UTF_8.name()) + "=" +
                                    URLEncoder.encode(it, Charsets.UTF_8.name())
                        }
                    }.reduce { acc, s -> acc + "&" + s }
        }
    }

}
