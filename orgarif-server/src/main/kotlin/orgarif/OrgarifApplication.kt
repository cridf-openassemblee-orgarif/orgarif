package orgarif

import orgarif.domain.ApplicationEnvironment
import orgarif.jooqlib.Configuration.configuration
import orgarif.jooqlib.ResetDatabase
import orgarif.utils.DatabaseUtils.datasource
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession
import java.util.*

@SpringBootApplication(exclude = [UserDetailsServiceAutoConfiguration::class])
@EnableJdbcHttpSession
class OrgarifApplication {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val env = System.getenv("env") ?: ApplicationEnvironment.dev.name
            System.setProperty("logging.config", "classpath:logback-webapp-$env.xml")
            TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
            initiateDatabaseIfEmpty(env)
            val app = SpringApplication(OrgarifApplication::class.java)
            app.setDefaultProperties(
                mapOf(
                    "spring.profiles.default" to
                            ApplicationEnvironment.dev.name + ',' +
                            springUserProfile()
                )
            )
            app.run(*args)
        }

        fun springUserProfile() = ApplicationEnvironment.dev.name + "-" + System.getProperty("user.name")

        fun initiateDatabaseIfEmpty(env: String) {
            if (env == ApplicationEnvironment.dev.name) {
                val r = datasource.connection.createStatement()
                    .executeQuery("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';")
                val databaseIsEmpty = !r.next()
                if (databaseIsEmpty) {
                    ResetDatabase.resetDatabaseSchema(configuration, true)
                }
            }
        }
    }

}