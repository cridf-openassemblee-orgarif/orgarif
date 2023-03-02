package orgarif.service

import orgarif.domain.ApplicationEnvironment
import orgarif.jooqlib.Configuration
import orgarif.jooqlib.ResetDatabase
import java.util.TimeZone
import javax.sql.DataSource
import jooqutils.DatabaseConfiguration
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class InitializationService(
    @Value("\${database.host}") val databaseHost: String,
    @Value("\${database.port}") val databasePort: Int,
    @Value("\${database.name}") val databaseName: String,
    @Value("\${database.user}") val databaseUser: String,
    @Value("\${database.password}") val databasePassword: String,
    @Value("\${insertInitialData}") val insertInitialData: Boolean,
    dataSource: DataSource,
    applicationInstance: ApplicationInstance,
    devInitialDataInjectorService: DevInitialDataInjectorService,
) {

    private val logger = KotlinLogging.logger {}

    val databaseConfiguration by lazy {
        DatabaseConfiguration(
            DatabaseConfiguration.Driver.psql,
            databaseHost,
            databasePort,
            databaseName,
            databaseUser,
            databasePassword,
            Configuration.configuration.schemas,
            Configuration.configuration.executablesPath,
            null)
    }

    init {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
        when (ApplicationInstance.env) {
            ApplicationEnvironment.dev -> {
                if (databaseIfEmpty(dataSource)) {
                    ResetDatabase.resetDatabaseSchema(databaseConfiguration)
                    if (insertInitialData) {
                        ResetDatabase.insertInitialData(databaseConfiguration)
                    }
                }
                if (insertInitialData) {
                    devInitialDataInjectorService.initiateDevData()
                }
            }
            ApplicationEnvironment.test -> {
                ResetDatabase.resetDatabaseSchema(databaseConfiguration)
                if (insertInitialData) {
                    ResetDatabase.insertInitialData(databaseConfiguration)
                }
            }
            ApplicationEnvironment.staging,
            ApplicationEnvironment.prod -> {
                if (insertInitialData) {
                    throw IllegalArgumentException("Inconsistent configuration")
                }
                // [doc] this log is also gonna trigger the deploymentId insertion at startup
                logger.info {
                    "Deployed build \"${applicationInstance.gitRevisionLabel}\", env \"${ApplicationInstance.env}\", deployment id ${applicationInstance.deploymentId}"
                }
            }
        }
    }

    fun databaseIfEmpty(datasource: DataSource): Boolean {
        val r =
            datasource.connection
                .createStatement()
                .executeQuery(
                    "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';")
        return !r.next()
    }
}
