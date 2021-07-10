package orgarif.utils

import ch.qos.logback.classic.pattern.ClassicConverter
import ch.qos.logback.classic.spi.ILoggingEvent
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

class LogbackIpConverter : ClassicConverter() {

    override fun convert(event: ILoggingEvent): String {
        val requestAttributes = RequestContextHolder.getRequestAttributes()
        return if (requestAttributes is ServletRequestAttributes) {
            "[${requestAttributes.request.remoteAddr}]"
        } else {
            ""
        }
    }

}
