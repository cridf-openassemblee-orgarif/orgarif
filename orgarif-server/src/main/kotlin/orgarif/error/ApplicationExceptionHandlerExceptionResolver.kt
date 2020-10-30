package orgarif.error

import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver
import javax.servlet.http.HttpServletRequest

// ne chope pas les exceptions "internes" Spring qui sortent en 401, 403, ...
// DefaultHandlerExceptionResolver les résout, et sont handlés par le ApplicationErrorController
// liste précise des choses gérées automatiquement là :
// http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-ann-rest-spring-mvc-exceptions
// (ou ouvrir DefaultHandlerExceptionResolver...)
// On override cette classe pour éviter les logs qu'elle fait en plus de notre @ControllerAdvice + @ExceptionHandler
// On pourrait par ailleurs mettre le code du @ControllerAdvice ici, mais on bypasserait complètement les autres
// mécanismes possibles... Notamment le handling au sein d'un controller (non utilisé à l'écriture de ces lignes...)
class ApplicationExceptionHandlerExceptionResolver : ExceptionHandlerExceptionResolver() {

    override fun logException(ex: Exception, request: HttpServletRequest) {
        // don't do anything !
    }

}