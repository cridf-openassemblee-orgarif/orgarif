package orgarif.jooq.tools

import mu.KotlinLogging
import orgarif.dbtooling.DatabaseCleaner
import orgarif.dbtooling.DatabaseInitializer

private val logger = run {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    KotlinLogging.logger {}
}

fun main() {
    DatabaseInitializer.createDb(Config.runDatabase)
    logger.info { "Clean database \"${Config.runDatabase}\"" }
    DatabaseCleaner.clean(Config.runDatabase)
    logger.info { "Initialize database \"${Config.runDatabase}\"" }
    DatabaseInitializer.initialize(Config.runDatabase, Config.sqlFilesUrl)
    logger.info { "[OK] reset database \"${Config.runDatabase}\"" }
}
