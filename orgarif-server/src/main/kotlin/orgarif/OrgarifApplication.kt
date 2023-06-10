package orgarif

import mu.KotlinLogging
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession
import orgarif.domain.ApplicationEnvironment
import orgarif.service.utils.ApplicationInstance

@SpringBootApplication(exclude = [UserDetailsServiceAutoConfiguration::class])
@EnableJdbcHttpSession
class OrgarifApplication {

    companion object {
        val logger = KotlinLogging.logger {}

        var runningApplication = false
            get() = field
            private set(value) {
                field = value
            }

        @JvmStatic
        fun main(args: Array<String>) {
            runningApplication = true
            val lowercaseEnv = ApplicationInstance.env.name.lowercase()
            logger.info { "Environment is [$lowercaseEnv]" }
            System.setProperty("logging.config", "classpath:logback-webapp-$lowercaseEnv.xml")
            val app = SpringApplication(OrgarifApplication::class.java)
            app.setDefaultProperties(
                mapOf("spring.profiles.default" to springProfile(lowercaseEnv)))
            app.run(*args)
        }

        private fun springProfile(lowercaseEnv: String) =
            if (ApplicationInstance.env == ApplicationEnvironment.Dev) {
                val userProfile = lowercaseEnv + "-" + System.getProperty("user.name")
                "$lowercaseEnv,$userProfile"
            } else {
                lowercaseEnv
            }
    }
}
