package orgarif.controller

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.MimeType
import orgarif.error.OrgarifNotFoundException
import orgarif.service.ApplicationInstance
import orgarif.service.HttpService

@RestController
// [doc] so it won't run on prod
@ConditionalOnExpression("!\${assets.useBuildFiles}")
class ReactHotLoaderController(
    @Value("\${assets.serverWebpackDevHost}") val assetsServerWebpackDevHost: String,
    val applicationInstance: ApplicationInstance,
    val httpService: HttpService
) {

    val logger = KotlinLogging.logger {}

    @GetMapping("/*.hot-update.*")
    fun handle(request: HttpServletRequest, response: HttpServletResponse) {
        if (applicationInstance.env == ApplicationEnvironment.dev) {
            val path = request.servletPath
            response.contentType =
                if (path.endsWith(".js")) {
                    MimeType.javascript.fullType
                } else {
                    MimeType.json.fullType
                }
            val r = httpService.getString(assetsServerWebpackDevHost + path)
            when (r) {
                is HttpService.MaybeStringResponse.EmptyResponse ->
                    logger.error { "Empty webpack hot update $r" }
                is HttpService.MaybeStringResponse.StringResponse -> {
                    if (r.code == HttpStatus.OK.value()) {
                        response.writer.print(r.body)
                    } else {
                        logger.error { "Error webpack hot update $r" }
                    }
                }
            }
        } else {
            throw OrgarifNotFoundException()
        }
    }
}
