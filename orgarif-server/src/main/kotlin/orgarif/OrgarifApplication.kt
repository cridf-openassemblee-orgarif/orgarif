package orgarif

import java.util.*
import org.flywaydb.core.Flyway
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession
import orgarif.domain.ApplicationEnvironment
import orgarif.service.ApplicationInstance
import orgarif.utils.DatabaseUtils

@SpringBootApplication(exclude = [UserDetailsServiceAutoConfiguration::class])
@EnableJdbcHttpSession
class OrgarifApplication {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val initDatabase = System.getenv("ORGARIF_INIT_DATABASE")?.toBoolean() ?: false
            System.setProperty(
                "logging.config", "classpath:logback-webapp-${ApplicationInstance.env}.xml")
            TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
            initiateDatabaseIfEmpty(initDatabase)
            val app = SpringApplication(OrgarifApplication::class.java)
            app.setDefaultProperties(
                mapOf(
                    "spring.profiles.default" to
                        ApplicationEnvironment.dev.name + "," + springUserProfile()))
            app.run(*args)
        }

        fun springUserProfile() =
            ApplicationEnvironment.dev.name + "-" + System.getProperty("user.name")

        fun initiateDatabaseIfEmpty(initDatabase: Boolean) {
            if (ApplicationInstance.env == ApplicationEnvironment.dev || initDatabase) {
                Flyway.configure().dataSource(DatabaseUtils.datasource).load().migrate()
                //                val r =
                //                    DatabaseUtils.datasource
                //                        .connection
                //                        .createStatement()
                //                        .executeQuery(
                //                            "SELECT * FROM pg_catalog.pg_tables WHERE schemaname
                // != 'pg_catalog' AND schemaname != 'information_schema';"
                //                        )
                //                val databaseIsEmpty = !r.next()
                //                if (databaseIsEmpty) {
                //                    ResetDatabase.resetDatabaseSchema(configuration, true)
                //                }
            }
        }
    }
}
