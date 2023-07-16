package orgarif.service.init

import java.util.Locale
import java.util.TimeZone
import javax.sql.DataSource
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service
import orgarif.database.ResetDatabase
import orgarif.domain.ApplicationEnvironment
import orgarif.repository.log.DeploymentLogDao
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.DateService

@Service
class InitializationService(
    dataSource: DataSource,
    devInitialDataInjectorService: DevInitialDataInjectorService,
    deploymentLogDao: DeploymentLogDao,
    @Value("\${insertInitialData}") private val insertInitialData: Boolean,
    private val dateService: DateService,
    private val environment: Environment,
) {

    private val logger = KotlinLogging.logger {}

    init {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
        Locale.setDefault(Locale.ENGLISH)
        when (ApplicationInstance.env) {
            ApplicationEnvironment.Dev,
            ApplicationEnvironment.Test -> {
                if (databaseIsEmpty(dataSource)) {
                    dataSource.connection.use { c ->
                        ResetDatabase.resetDatabaseSchema(c, insertInitialData)
                    }
                }
                if (insertInitialData) {
                    devInitialDataInjectorService.initiateDevData()
                }
            }
            ApplicationEnvironment.Staging,
            ApplicationEnvironment.Prod -> {
                if (insertInitialData) {
                    throw IllegalArgumentException(
                        "Inconsistent configuration, insertInitialData should be false on ${ApplicationInstance.env}")
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

    fun databaseIsEmpty(datasource: DataSource): Boolean {
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
                    "Spring profiles list contains multiple environments: $profiles")
            }
        }
    }
}
