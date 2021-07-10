package orgarif.config

import java.time.Duration
import java.time.temporal.ChronoUnit
import javax.servlet.*
import javax.servlet.http.HttpServletResponse

class CachingHttpHeadersFilter : Filter {

    private val lastModified = System.currentTimeMillis()
    private val cacheTimeToLive = Duration.of((365 * 3 + 366).toLong(), ChronoUnit.DAYS).toMillis()

    override fun init(filterConfig: FilterConfig) {
    }

    override fun destroy() {}

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        val httpResponse = response as HttpServletResponse
        httpResponse.setHeader("Cache-Control", "max-age=" + this.cacheTimeToLive + ", public")
        httpResponse.setHeader("Pragma", "cache")
        httpResponse.setDateHeader("Expires", this.cacheTimeToLive + System.currentTimeMillis())
        httpResponse.setDateHeader("Last-Modified", lastModified)
        chain.doFilter(request, response)
    }

}
