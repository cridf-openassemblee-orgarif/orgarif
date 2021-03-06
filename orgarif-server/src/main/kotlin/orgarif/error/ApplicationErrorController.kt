package orgarif.error

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.error.ErrorAttributeOptions
import org.springframework.boot.web.servlet.error.ErrorAttributes
import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.ModelAndView
import orgarif.controller.IndexController
import orgarif.domain.RequestErrorId
import orgarif.service.RandomService
import orgarif.config.Routes
import java.util.*
import javax.servlet.http.HttpServletResponse

@RestController
class ApplicationErrorController(
    val errorAttributes: ErrorAttributes,
    val randomService: RandomService,
    val applicationExceptionHandler: ApplicationExceptionHandler
) : ErrorController {

    private val logger = KotlinLogging.logger {}

    // TODO[secu] de la nécessité de tester ce truc là, il était pété en silence =x
    // encore une fois..
    // TODO[secu] si acces direct on redirect
    @RequestMapping(Routes.error)
    fun error(request: WebRequest, response: HttpServletResponse): ModelAndView {
        val errorMap = errorAttributes.getErrorAttributes(
            request,
            ErrorAttributeOptions.of(
                ErrorAttributeOptions.Include.BINDING_ERRORS,
                ErrorAttributeOptions.Include.EXCEPTION,
                ErrorAttributeOptions.Include.MESSAGE,
                ErrorAttributeOptions.Include.STACK_TRACE
            )
        )
        // [doc] in case logout is quickly called twice
        if (response.status == 403 && errorMap["path"] == Routes.logout) {
            logger.trace { "Some user logged out twice" }
            return ModelAndView("redirect:${Routes.root}")
        }
        val initialError = errorMap["error"] as String
        val exception = errorAttributes.getError(request)
        // TODO[secu] rewrite return applicationExceptionHandler.render(..., when() {})
        val errorId = randomService.id<RequestErrorId>()
        val (status, error) = when (response.status) {
            // when we directly reach the /error url !
            // we'are arrived here with a status 200
            200 -> 404 to "Not Found"
            500 -> {
                // TODO[secu] in which case are we getting here ?
                // if // within the url
                // with SecurityException
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
        return applicationExceptionHandler.render(
            request, response,
            RequestError(
                errorId,
                status,
                error,
                errorMap["message"] as String,
                date.toInstant(),
                ReadableStackTrace(exception)
            )
        )
    }

}
