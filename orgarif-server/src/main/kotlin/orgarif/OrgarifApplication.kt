package orgarif

import org.flywaydb.core.Flyway
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession
import orgarif.domain.ApplicationEnvironment
import java.util.*

@SpringBootApplication(exclude = [UserDetailsServiceAutoConfiguration::class])
@EnableJdbcHttpSession
@ComponentScan("orgarif")
class OrgarifApplication {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val env = System.getenv("env") ?: ApplicationEnvironment.dev.name
            System.setProperty("logging.config", "classpath:logback-webapp-$env.xml")
            TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
            val app = SpringApplication(OrgarifApplication::class.java)
            app.setDefaultProperties(
                mapOf(
                    "spring.profiles.default" to
                            ApplicationEnvironment.dev.name + ',' +
                            springUserProfile()
                )
            )
            val flyway = Flyway.configure().dataSource("localhost", "mlo", "").load()
            flyway.migrate()
            app.run(*args)
        }

        fun springUserProfile() = ApplicationEnvironment.dev.name + "-" + System.getProperty("user.name")
    }

}
