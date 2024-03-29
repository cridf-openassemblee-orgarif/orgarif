package orgarif.controller

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.MimeType
import orgarif.domain.Uri
import orgarif.error.OrgarifNotFoundException
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.HttpService

@RestController
// [doc] so it won't run on prod
@ConditionalOnExpression("!\${assets.useBuildFiles}")
class ReactHotLoaderController(
    @Value("\${assets.webpackDevPort}") private val assetsWebpackDevPort: String,
    @Value("\${assets.webpackDevHost}") private val assetsWebpackDevHost: String,
    private val httpService: HttpService
) {

    val logger = KotlinLogging.logger {}

    val baseUrl = Uri("http://$assetsWebpackDevHost:$assetsWebpackDevPort")

    @GetMapping("/*.hot-update.*")
    fun handle(request: HttpServletRequest, response: HttpServletResponse) {
        if (ApplicationInstance.env != ApplicationEnvironment.Dev) {
            throw OrgarifNotFoundException()
        }
        val path = request.servletPath
        response.contentType =
            if (path.endsWith(".js")) {
                MimeType.ApplicationJavascript.type
            } else {
                MimeType.ApplicationJson.type
            }
        val r = httpService.execute(HttpMethod.GET, baseUrl.resolve(path))
        if (r.code == HttpStatus.OK) {
            response.writer.print(r.bodyString)
        } else {
            logger.error { "Error webpack hot update $r" }
        }
    }
}
