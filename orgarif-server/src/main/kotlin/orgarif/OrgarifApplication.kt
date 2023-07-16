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

        fun springProfile(lowercaseEnv: String) =
            if (ApplicationInstance.env == ApplicationEnvironment.Dev) {
                val userProfile = lowercaseEnv + "-" + System.getProperty("user.name")
                "$lowercaseEnv,$userProfile"
            } else {
                lowercaseEnv
            }
    }
}

fun main(args: Array<String>) {
    OrgarifApplication.runningApplication = true
    val lowercaseEnv = ApplicationInstance.env.name.lowercase()
    OrgarifApplication.logger.info { "Environment is [$lowercaseEnv]" }
    System.setProperty("logging.config", "classpath:logback-webapp-$lowercaseEnv.xml")
    val app = SpringApplication(OrgarifApplication::class.java)
    app.setDefaultProperties(
        mapOf("spring.profiles.default" to OrgarifApplication.springProfile(lowercaseEnv)))
    app.run(*args)
}
