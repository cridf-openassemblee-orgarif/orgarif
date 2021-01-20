package orgarif.config

import mu.KotlinLogging
import org.springframework.boot.web.servlet.ServletContextInitializer
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.time.Duration
import java.time.temporal.ChronoUnit
import javax.servlet.ServletContext

@Configuration
class WebConfiguration(val env: Environment) : WebMvcConfigurer, ServletContextInitializer {

    private val logger = KotlinLogging.logger {}

    // cache for 4 years
    private val cacheTimeToLive = Duration.of((365 * 3 + 366).toLong(), ChronoUnit.DAYS)

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry
            .addResourceHandler(ApplicationConstants.staticResourcesPath + "/**")
            .addResourceLocations("classpath:/static/", "file:static/")
            .setCachePeriod(cacheTimeToLive.seconds.toInt())
    }

    override fun onStartup(servletContext: ServletContext) {
        if (env.activeProfiles.isNotEmpty()) {
            val activeProfiles = env.activeProfiles.joinToString(", ")
            logger.info { "Web application configuration, using profiles: $activeProfiles" }
        }
    }
}
