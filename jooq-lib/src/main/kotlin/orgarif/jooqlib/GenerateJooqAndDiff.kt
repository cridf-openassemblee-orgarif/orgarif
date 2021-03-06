package orgarif.jooqlib

import orgarif.jooqlib.Configuration.configuration
import orgarif.jooqlib.utils.FileUtils
import mu.KotlinLogging
import jooqutils.DatabaseInitializer
import jooqutils.JooqGeneration
import kotlin.io.path.name

fun main() {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    GenerateJooqAndDiff.generate()
    GenerateJooqAndDiff.logger.info { "[OK] Jooq generation" }
}

object GenerateJooqAndDiff {

    internal val logger = KotlinLogging.logger {}

    val projectDir by lazy {
        val projectBasePath = FileUtils.projectBasePath()
        if (projectBasePath.name == "jooq-lib") {
            // happens when running 'gradle resetDatabase'
            projectBasePath.parent
        } else {
            projectBasePath
        }
    }

    val webServerResourcesDir by lazy { projectDir.resolve("orgarif-server/src/main/resources") }

    val sqlSchemaFilesDir by lazy { webServerResourcesDir.resolve("data/schema") }

    val sqlInsertFilesDir by lazy { webServerResourcesDir.resolve("data/insert") }

    val buildDir by lazy { projectDir.resolve("jooq-lib/build") }

    val sqlCleanResultFile by lazy { buildDir.resolve("clean-database.sql") }

    val sqlInitiateSchemaResultFile by lazy { buildDir.resolve("initiate-database.sql") }

    fun generate() {
        logger.info { "Generate Jooq" }
        val generationDatabaseConfiguration =
            configuration.copy(databaseName = configuration.databaseName + "-dbtooling")
        logger.info { "Generation via base ${generationDatabaseConfiguration.databaseName}" }
        try {
            DatabaseInitializer.dropDb(generationDatabaseConfiguration)
            DatabaseInitializer.createDb(generationDatabaseConfiguration)
            DatabaseInitializer.initializeSchema(generationDatabaseConfiguration, sqlSchemaFilesDir, sqlCleanResultFile)
            logger.info { "Generate Jooq code" }
            JooqGeneration.generateJooq(
                generationDatabaseConfiguration,
                setOf("spring_session", "spring_session_attributes"),
                "orgarif.jooq",
                "jooq-lib/src/generated/java"
            )
            // TODO [doc] diff se plantera si Config.runDatabase n'existe pas, pas bien grave mais faire mieux
            JooqGeneration.generateDiff(configuration, generationDatabaseConfiguration, buildDir)
            ResetDatabase.resetDatabaseSchema(configuration, true)
        } finally {
            DatabaseInitializer.dropDb(generationDatabaseConfiguration)
        }
    }

}