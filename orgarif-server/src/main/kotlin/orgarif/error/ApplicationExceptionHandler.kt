package orgarif.error

import orgarif.config.ApplicationConstants
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.MimeType
import orgarif.domain.RequestErrorId
import orgarif.domain.Role
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService
import orgarif.utils.OrgarifStringUtils
import freemarker.ext.beans.BeansWrapperBuilder
import freemarker.template.Configuration
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.view.json.MappingJackson2JsonView

@ControllerAdvice
class ApplicationExceptionHandler(
    private val dateService: DateService,
    private val randomService: RandomService,
    private val userSessionService: UserSessionService
) {

    private val logger = KotlinLogging.logger {}

    val statics =
        BeansWrapperBuilder(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS).build().staticModels

    @ExceptionHandler(Exception::class)
    fun defaultErrorHandler(
        request: WebRequest,
        response: HttpServletResponse,
        exception: Exception
    ): ModelAndView {
        // TODO[tmpl][secu] handle exceptions
        // log userid, mail, ip
        val id = randomService.id<RequestErrorId>()
        val readableStackTrace =
            if (ApplicationInstance.env == ApplicationEnvironment.Dev ||
                userSessionService.hasRole(Role.Admin)) {
                ReadableStackTrace(exception)
            } else {
                null
            }
        val subCause = exception.cause?.cause
        when {
            subCause is SizeLimitExceededException -> {
                // TODO[tmpl][secu] in practice what happens with user null ?
                logger.info {
                    // TODO[tmpl][secu] which means user must be connected...
                    "User ${userSessionService.getUserSession()} tried to upload a file to big: ${subCause.message}"
                }
                // TODO[tmpl][secu] error codes for the front !
                return render(
                    request,
                    response,
                    RequestError(
                        id,
                        500,
                        "Error",
                        "File exceeds max authorized size",
                        dateService.now(),
                        readableStackTrace))
            }
            exception is DisplayMessageException -> {
                // TODO[tmpl][secu] this "DisplayError" is used on front
                logger.info { "[user message exception] ${exception.logMessage}" }
                return render(
                    request,
                    response,
                    RequestError(
                        id,
                        500,
                        "DisplayError",
                        exception.displayMessage,
                        dateService.now(),
                        readableStackTrace))
            }
            else -> {
                if (userSessionService.isAuthenticated()) {
                    logger.warn(exception) {
                        "Unhandled exception [$id] for user ${userSessionService.getUserSession()}"
                    }
                } else {
                    logger.warn(exception) { "Unhandled exception [$id]" }
                }
                // TODO[tmpl][secu] i18n, & i18n from spring
                // all strings should come from a central place
                return render(
                    request,
                    response,
                    RequestError(
                        id, 500, "Error", "Unknown error", dateService.now(), readableStackTrace))
            }
        }
    }

    fun render(
        request: WebRequest,
        response: HttpServletResponse,
        requestError: RequestError
    ): ModelAndView {
        val mav = ModelAndView()
        response.status = requestError.status
        val stackTrace = requestError.stackTrace
        // TODO[tmpl][secu] reliable ?
        if (request.getHeader("Content-Type") == MimeType.JSON.fullType) {
            response.contentType = MimeType.JSON.fullType
            // write in the buffer with
            // objectMapper.writeValue(response.outputStream, requestErrorNode)
            // is buggy...
            mav.view = MappingJackson2JsonView(Serializer.objectMapper)
            mav.model["errorId"] = requestError.id
            mav.model["status"] = requestError.status
            mav.model["error"] = requestError.error
            mav.model["message"] = requestError.message
            mav.model["instant"] = requestError.instant
            if (stackTrace != null) {
                mav.model["stackTrace"] = stackTrace
            }
        } else {
            mav.model["requestErrorIdAsString"] =
                OrgarifStringUtils.serializeUuid(requestError.id.rawId)
            mav.model["requestError"] = requestError
            if (ApplicationInstance.env == ApplicationEnvironment.Dev && stackTrace != null) {
                mav.model[ApplicationConstants.springMvcModelKeyStackTrace] =
                    stackTrace.toReadableString()
            }
            mav.model["statics"] = statics
            mav.viewName = "error"
        }
        return mav
    }
}
