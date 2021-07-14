package orgarif.jooqlib

import jooqutils.DatabaseCleaner
import jooqutils.DatabaseConfiguration
import jooqutils.DatabaseInitializer
import orgarif.jooqlib.Configuration.configuration
import orgarif.jooqlib.GenerateJooqAndDiff.sqlCleanResultFile
import orgarif.jooqlib.GenerateJooqAndDiff.sqlInitiateSchemaResultFile
import orgarif.jooqlib.GenerateJooqAndDiff.sqlInsertFilesDir
import orgarif.jooqlib.GenerateJooqAndDiff.sqlSchemaFilesDir
import mu.KotlinLogging

fun main() {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    ResetDatabase.resetDatabaseSchema(configuration, true)
    ResetDatabase.logger.info { "[OK] reset database \"${configuration.databaseName}\"" }
}

object ResetDatabase {
    // TODO[doc] generated directory can be deleted if there is a problem
    internal val logger = KotlinLogging.logger {}

    fun resetDatabaseSchema(configuration: DatabaseConfiguration, insertInitialData: Boolean) {
        logger.info { "Reset database \"${configuration.databaseName}\", using directory : $sqlSchemaFilesDir" }
        logger.info { "Create database \"${configuration.databaseName}\"" }
        DatabaseInitializer.createDb(configuration)
        logger.info { "Clean database \"${configuration.databaseName}\"" }
        DatabaseCleaner.clean(configuration, sqlCleanResultFile)
        logger.info { "Initialize database schema \"${configuration.databaseName}\"" }
        DatabaseInitializer.initializeSchema(configuration, sqlSchemaFilesDir, sqlInitiateSchemaResultFile)
        if (insertInitialData) {
            logger.info { "Insert initial data, using directory : $sqlInsertFilesDir" }
            DatabaseInitializer.insert(configuration, sqlInsertFilesDir)
        }
    }
}
