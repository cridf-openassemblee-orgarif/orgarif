package orgarif.database.utils

import mu.KotlinLogging
import orgarif.database.domain.PsqlDatabaseConfiguration

object DatabaseUtils {
    internal val logger = KotlinLogging.logger {}

    fun createDatabaseIfNeeded(configuration: PsqlDatabaseConfiguration) {
        logger.info { "Create database if needed \"${configuration.databaseName}\"" }
        // will fail if actually not needed, it's ok
        ShellRunner.run("createdb", configuration.databaseName)
    }

    fun dropDatabaseIfExists(configuration: PsqlDatabaseConfiguration) {
        logger.info { "Drop database \"${configuration.databaseName}\"" }
        ShellRunner.run("dropdb", configuration.databaseName, "--force")
    }
}
