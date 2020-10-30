package orgarif.utils

import ch.qos.logback.classic.pattern.ClassicConverter
import ch.qos.logback.classic.spi.ILoggingEvent
import org.springframework.security.core.context.SecurityContextHolder
import java.lang.reflect.Method

class LogbackUserSessionConverter : ClassicConverter() {

    var method: Method? = null

    override fun convert(event: ILoggingEvent) =
            if (SecurityContextHolder.getContext().authentication != null
                    && SecurityContextHolder.getContext().authentication.isAuthenticated
                    // [doc] 'is Session' won't work because the classloader isn't the same
                    && SecurityContextHolder.getContext().authentication.principal !is String) {
                SecurityContextHolder.getContext().authentication.principal.toString()
            } else ""
}