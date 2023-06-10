package orgarif.error

import jakarta.servlet.http.HttpServletRequest
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver

// doesn't catch Spring "internal" exceptions: 401, 403...
// DefaultHandlerExceptionResolver resolve them, they are handled by ApplicationErrorController
// precise list of stuff automatically handled there:
// http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-ann-rest-spring-mvc-exceptions
// (or open DefaultHandlerExceptionResolver...)
// We override this class to avoid logs it's doing additionnaly to our @ControllerAdvice +
// @ExceptionHandler
// We actually could put code from @ControllerAdvice here, but we'd completely bypass the other
// possible mecanisms...
// Especially the handling from a controller (which isn't use in the fmk code base yet)
class ApplicationExceptionHandlerExceptionResolver : ExceptionHandlerExceptionResolver() {

    override fun logException(ex: Exception, request: HttpServletRequest) {
        // don't do anything !
    }
}
