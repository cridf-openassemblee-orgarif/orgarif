package orgarif.config

import mu.KotlinLogging
import org.springframework.boot.web.servlet.ServletContextInitializer
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.util.*
import javax.servlet.DispatcherType
import javax.servlet.ServletContext

@Configuration
class WebConfiguration(val env: Environment) : WebMvcConfigurer, ServletContextInitializer {

    private val logger = KotlinLogging.logger {}

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry
                .addResourceHandler(ApplicationConstants.staticResourcesPath + "/**")
                .addResourceLocations("classpath:/static/", "file:static" + ApplicationConstants.staticResourcesPath + "/")
    }

    override fun onStartup(servletContext: ServletContext) {
        if (env.activeProfiles.isNotEmpty()) {
            val activeProfiles = env.activeProfiles.joinToString(", ")
            logger.info { "Web application configuration, using profiles: $activeProfiles" }
        }
        val disps = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ASYNC)
        initCachingHttpHeadersFilter(servletContext, disps)
    }

    private fun initCachingHttpHeadersFilter(servletContext: ServletContext,
                                             disps: EnumSet<DispatcherType>) {
        val cachingHttpHeadersFilter = servletContext.addFilter("cachingHttpHeadersFilter", CachingHttpHeadersFilter())
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, ApplicationConstants.staticResourcesPath + "/*")
    }

}
