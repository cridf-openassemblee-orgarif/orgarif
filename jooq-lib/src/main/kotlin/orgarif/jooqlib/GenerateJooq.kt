package orgarif.jooqlib

import jooqutils.DatabaseCleaner
import jooqutils.DatabaseConfiguration
import jooqutils.DatabaseInitializer
import jooqutils.JooqGeneration
import mu.KotlinLogging
import java.io.File
import java.io.FileInputStream
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

fun main() {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    GenerateJooq.generate()
    GenerateJooq.logger.info { "[OK] Jooq generation" }
}

object GenerateJooq {

    internal val logger = KotlinLogging.logger {}

    val configuration by lazy {
        val properties = Properties().apply {
            load(FileInputStream(webServerSrcFile("resources/application-dev.properties")))
            load(FileInputStream(webServerSrcFile("resources/application-dev-${System.getenv("USER")}.properties")))
        }
        DatabaseConfiguration(
            DatabaseConfiguration.Driver.psql,
            // TODO comment truc intelligent ?
            "orgarif",
            properties.getProperty("database.user"),
            properties.getProperty("database.password"),
            setOf("public"),
            null
        )
    }

    val sqlFilesPath by lazy {
        Paths.get(webServerSrcFile("resources/data").toURI())
    }

    fun webServerSrcFile(path: String): File {
        val userDir = System.getProperty("user.dir")
        // FIXMENOW un moyen propre de faire ça ?
        if ("orgarif-server" in userDir) {
            return File("$userDir/src/main/" + path)
        } else {
            return File("$userDir/orgarif-server/src/main/" + path)
        }
    }

    val sqlCleanResultPath by lazy {
        Paths.get(jooqLibTargetDir("clean-database.sql").toURI())
    }

    val sqlInitiateSchemaResultPath by lazy {
        Paths.get(jooqLibTargetDir("initiate-database.sql").toURI())
    }

    fun jooqLibTargetDir(path: String): File {
        val userDir = System.getProperty("user.dir")
        // FIXMENOW un moyen propre de faire ça ?
        if ("orgarif-server" in userDir) {
            return File("$userDir/build/" + path)
        } else {
            return File("$userDir/jooq-lib/build/" + path)
        }
    }

    fun generate() {
        logger.info { "Generate Jooq" }
        logger.info { "Create database \"${configuration.databaseName}\"" }
        DatabaseInitializer.createDb(configuration)
        logger.info { "Clean base ${configuration.databaseName}" }
        DatabaseCleaner.clean(configuration, sqlCleanResultPath)
        logger.info { "Initialize database \"${configuration.databaseName}\"" }
        DatabaseInitializer.initializeSchema(configuration, sqlFilesPath, sqlInitiateSchemaResultPath)
        logger.info { "Generate Jooq code" }
        JooqGeneration.generateJooq(
            configuration,
            setOf("spring_session", "spring_session_attributes"),
            "orgarif.jooq",
            "jooq-lib/src/generated/java"
        )
    }

}