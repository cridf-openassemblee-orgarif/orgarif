package orgarif.service.user

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import javax.servlet.http.HttpServletRequest

@Service
class IpService(@Value("\${reverseProxy}") val reverseProxy: Boolean) {

    private val logger = KotlinLogging.logger {}

    val proxiedIpHeader = "x-forwarded-for"

    fun getClientIp(request: HttpServletRequest): String {
        return if (reverseProxy) {
            try {
                request.getHeader(proxiedIpHeader)
            } catch (e: Exception) {
                logger.error(e) { "Problem in getting header x-forwarded-for" }
                request.remoteAddr
            }
        } else {
            request.remoteAddr
        }
    }

}