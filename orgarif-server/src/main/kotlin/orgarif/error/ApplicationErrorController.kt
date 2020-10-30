package orgarif.error

import mu.KotlinLogging
import orgarif.controller.IndexController
import orgarif.domain.RequestErrorId
import orgarif.service.RandomService
import org.springframework.boot.web.servlet.error.ErrorAttributes
import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.ModelAndView
import java.util.*
import javax.servlet.http.HttpServletResponse

@RestController
class ApplicationErrorController(val errorAttributes: ErrorAttributes,
                                 val randomService: RandomService,
                                 val applicationExceptionHandler: ApplicationExceptionHandler) : ErrorController {

    private val logger = KotlinLogging.logger {}

    companion object {
        private const val errorRoute = "/error"
    }

    override fun getErrorPath(): String {
        return errorRoute
    }

    // TODO[secu] de la nécessité de tester ce truc là, il était pété en silence =x
    // encore une fois..
    // TODO[secu] si acces direct on redirect
    @RequestMapping(errorRoute)
    fun error(request: WebRequest, response: HttpServletResponse): ModelAndView {
        val errorMap = errorAttributes.getErrorAttributes(request, false)
        // [doc] in case logout is quickly called twice
        if (response.status == 403 && errorMap["path"] == IndexController.logoutRoute) {
            logger.trace { "Some user logged out twice" }
            return ModelAndView("redirect:/")
        }
        val initialError = errorMap["error"] as String
        val exception = errorAttributes.getError(request)
        // TODO[secu] rewrite return applicationExceptionHandler.render(..., when() {})
        val errorId = RequestErrorId(randomService.randomUUID())
        val (status, error) = when (response.status) {
            // when we directly reach the /error url !
            // we'are arrived here with a status 200
            200 -> 404 to "Not Found"
            500 -> {
                // TODO[secu] on passe ici dans quel cas ?
                // SecurityException par ex apparemment
//                when (exception) {
//                    is ErrorDisplayException -> Triple(response.status, initialError, null)
//                    else -> {
                logger.warn(exception) { "Unknown exception [$errorId]" }
                response.status to initialError
//                    }
//                }
            }
            // TODO[secu] on fait quoi ?
            else -> response.status to initialError
        }
        val date = errorMap["timestamp"] as Date
        return applicationExceptionHandler.render(request, response,
                RequestError(errorId,
                        status,
                        error,
                        errorMap["message"] as String,
                        date.toInstant(),
                        ReadableStackTrace(exception)))
    }

}
