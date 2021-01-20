package orgarif.endpoint

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.MimeType
import orgarif.error.OrgarifNotFoundException
import orgarif.service.ApplicationInstance
import orgarif.service.HttpService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
class ReactHotLoaderEndpoint(
    @Value("\${assets.webpackDevHost}") val assetsWebpackDevHost: String,
    val applicationInstance: ApplicationInstance,
    val httpService: HttpService
) {

    @GetMapping("/*.hot-update.*")
    fun handle(request: HttpServletRequest, response: HttpServletResponse) {
        if (applicationInstance.env == ApplicationEnvironment.dev) {
            val path = request.servletPath
            response.contentType = if (path.endsWith(".js")) {
                MimeType.javascript.fullType
            } else {
                MimeType.json.fullType
            }
            response.writer.print(httpService.getString(assetsWebpackDevHost + path).body)
        } else {
            throw OrgarifNotFoundException()
        }
    }

}
