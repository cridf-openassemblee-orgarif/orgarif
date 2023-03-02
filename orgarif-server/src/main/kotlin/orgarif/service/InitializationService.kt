package orgarif.service

import orgarif.domain.ApplicationEnvironment
import orgarif.jooqlib.Configuration
import orgarif.jooqlib.ResetDatabase
import orgarif.repository.log.DeploymentLogDao
import java.util.TimeZone
import javax.sql.DataSource
import jooqutils.DatabaseConfiguration
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.env.Environment
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
    devInitialDataInjectorService: DevInitialDataInjectorService,
    deploymentLogDao: DeploymentLogDao,
    val randomService: RandomService,
    val dateService: DateService,
    val environment: Environment,
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
            ApplicationEnvironment.Dev -> {
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
            ApplicationEnvironment.Test -> {
                ResetDatabase.resetDatabaseSchema(databaseConfiguration)
                if (insertInitialData) {
                    ResetDatabase.insertInitialData(databaseConfiguration)
                }
            }
            ApplicationEnvironment.Staging,
            ApplicationEnvironment.Prod -> {
                if (insertInitialData) {
                    throw IllegalArgumentException("Inconsistent configuration")
                }
                logger.info {
                    "Deployed build \"${ApplicationInstance.gitRevisionLabel}\", " +
                        "env \"${ApplicationInstance.env}\", " +
                        "deployment id ${ApplicationInstance.deploymentLogId}"
                }
            }
        }
        deploymentLogDao.insert(
            DeploymentLogDao.Record(
                ApplicationInstance.deploymentLogId,
                ApplicationInstance.gitRevisionLabel,
                dateService.serverZoneId(),
                dateService.now(),
                shutdownDate = null))
        verifySpringProfilesConsistency()
    }

    fun databaseIfEmpty(datasource: DataSource): Boolean {
        val r =
            datasource.connection
                .createStatement()
                .executeQuery(
                    "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';")
        return !r.next()
    }

    private fun verifySpringProfilesConsistency() {
        // verify ApplicationInstance.env is in Spring profiles
        val profiles = let {
            val e = ApplicationEnvironment.values().map { it.name.lowercase() }
            environment.activeProfiles.filter { it in e }
        }
        // if not empty, let's check profiles are consistent with env
        // (if is empty, default profiles will be enabled)
        if (profiles.isNotEmpty()) {
            if (profiles.first() != ApplicationInstance.env.name.lowercase()) {
                throw IllegalStateException(
                    "Spring profiles should start by ${ApplicationInstance.env} (is $profiles)")
            }
            if (profiles.size != 1) {
                throw IllegalStateException(
                    "Spring profiles list contains multiple environments : $profiles")
            }
        }
    }
}
