package orgarif.jooqlib

import jooqutils.DatabaseCleaner
import jooqutils.DatabaseConfiguration
import jooqutils.DatabaseInitializer
import orgarif.jooqlib.GenerateJooq.configuration
import orgarif.jooqlib.GenerateJooq.sqlFilesPath
import mu.KotlinLogging
import orgarif.jooqlib.GenerateJooq.sqlCleanResultPath
import orgarif.jooqlib.GenerateJooq.sqlInitiateSchemaResultPath
import java.nio.file.Path

fun main() {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    ResetDatabase.resetDatabase()
    ResetDatabase.logger.info { "[OK] reset database \"${configuration.databaseName}\"" }
}

object ResetDatabase {
    // TODO[doc] de la possibilité de supprimer dossier generated s'il y a un pb
    internal val logger = KotlinLogging.logger {}

    fun resetDatabase() {
        logger.info { "Reset database \"${configuration.databaseName}\", using data directory : ${sqlFilesPath}" }
        logger.info { "Create database \"${configuration.databaseName}\"" }
        DatabaseInitializer.createDb(configuration)
        logger.info { "Clean database \"${configuration.databaseName}\"" }
        DatabaseCleaner.clean(configuration, sqlCleanResultPath)
        logger.info { "Initialize database \"${configuration.databaseName}\"" }
        DatabaseInitializer.initializeSchema(configuration, sqlFilesPath, sqlInitiateSchemaResultPath)
    }
}

