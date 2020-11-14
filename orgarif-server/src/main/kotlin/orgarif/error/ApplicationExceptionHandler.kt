package orgarif.error

import com.fasterxml.jackson.databind.JsonMappingException
import freemarker.ext.beans.BeansWrapperBuilder
import freemarker.template.Configuration
import mu.KotlinLogging
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.view.json.MappingJackson2JsonView
import orgarif.config.ApplicationConstants
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.MimeType
import orgarif.domain.RequestErrorId
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.service.user.UserSessionHelper
import orgarif.utils.OrgarifStringUtils
import orgarif.utils.Serializer
import javax.servlet.http.HttpServletResponse

@ControllerAdvice
class ApplicationExceptionHandler(val applicationInstance: ApplicationInstance,
                                  val dateService: DateService,
                                  val randomService: RandomService) {

    private val logger = KotlinLogging.logger {}

    val statics = BeansWrapperBuilder(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS).build().staticModels

    @ExceptionHandler(Exception::class)
    fun defaultErrorHandler(request: WebRequest, response: HttpServletResponse, exception: Exception): ModelAndView {
        // TODO[secu] traitements exceptions
        // pr log userid, mail, ip
        val id = RequestErrorId(randomService.randomUUID())
        val readableStackTrace =
                if (applicationInstance.env == ApplicationEnvironment.dev ||
                        (UserSessionHelper.isAuthenticated() && UserSessionHelper.isAdmin())) {
                    ReadableStackTrace(exception)
                } else {
                    null
                }
        val cause = exception.cause
        val subCause = cause?.cause
        when {
            subCause is SizeLimitExceededException -> {
                // TODO[secu] tester dans la pratiqu, il se passe quoi avec le user null
                logger.info {
                    // TODO[secu] alors du coup user nécessairement connecté... ce n'était plus le cas à un moment !
                    "User ${UserSessionHelper.getUserSession()} tried to upload a file to big : " +
                            subCause.message
                }
                // TODO[secu] un système de code pour front
                return render(request, response, RequestError(id, 500, "Error",
                        "File exceeds max authorized size", dateService.now(), readableStackTrace))
            }
            exception is DisplayMessageException -> {
                // TODO[secu] ce "DisplayError" est used en front
                logger.info { "[user message exception] ${exception.logMessage}" }
                return render(request, response, RequestError(id, 500, "DisplayError",
                        exception.displayMessage, dateService.now(), readableStackTrace))
            }
            exception is JsonMappingException -> {
                when (cause) {
                    is OrgarifSerializationLocalDateException -> {
                        return render(request, response, RequestError(id, 400, "SerializationError",
                                // on ne met pas la date dans le message car non formattée ce n'est pas clair
                                // (2020-33-33 vs 33/33/2020)
                                "La date n'est pas valide.", dateService.now(), readableStackTrace))
                    }
                    else -> {
                        return render(request, response, RequestError(id, 500, "Erreur", "Erreur inconnue",
                                dateService.now(), readableStackTrace))
                    }
                }
            }
            else -> {
                if (UserSessionHelper.isAuthenticated()) {
                    logger.warn(exception) { "Unhandled exception [$id] for user ${UserSessionHelper.getUserSession()}" }
                } else {
                    logger.warn(exception) { "Unhandled exception [$id]" }
                }
                // TODO[secu] i18n, et i18n de spring
                // centraliser les strings user qui viennent du back
                return render(request, response, RequestError(id, 500, "Erreur", "Erreur inconnue",
                        dateService.now(), readableStackTrace))
            }
        }
    }

    fun render(request: WebRequest,
               response: HttpServletResponse,
               requestError: RequestError): ModelAndView {
        val mav = ModelAndView()
        response.status = requestError.status
        val stackTrace = requestError.stackTrace
        // TODO[secu] fiable ça ?
        if (request.getHeader("Content-Type") == MimeType.json.fullType) {
            response.contentType = MimeType.json.fullType
            // écrire dans le tampon via un
            // objectMapper.writeValue(response.outputStream, requestErrorNode)
            // est tout buggy
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
            mav.model["requestErrorIdAsString"] = OrgarifStringUtils.serializeUuid(requestError.id.rawId)
            mav.model["requestError"] = requestError
            if (applicationInstance.env == ApplicationEnvironment.dev && stackTrace != null) {
                mav.model[ApplicationConstants.springMvcModelKeyStackTrace] = stackTrace.toReadableString()
            }
            mav.viewName = "error"
        }
        // TODO[secu] pv move aux erreurs en html only?
        mav.model["statics"] = statics
        return mav
    }
}
