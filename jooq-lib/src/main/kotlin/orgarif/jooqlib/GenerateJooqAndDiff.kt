package orgarif.jooqlib

import orgarif.jooqlib.Configuration.configuration
import java.nio.file.Paths
import jooqutils.DatabaseInitializer
import jooqutils.JooqGeneration
import mu.KotlinLogging

fun main() {
    System.setProperty("logback.configurationFile", "logback-jooq-lib.xml")
    GenerateJooqAndDiff.generate()
    GenerateJooqAndDiff.logger.info { "[OK] Jooq generation" }
}

object GenerateJooqAndDiff {

    internal val logger = KotlinLogging.logger {}

    val projectDir by lazy {
        // contexts : run in intellij, gradle (with different root dirs), tests
        val userDir = System.getProperty("user.dir")
        val rootDir = let {
            listOf(
                    "/jooq-lib",
                    // (in tests)
                    "/orgarif-server",
                )
                .forEach {
                    if (userDir.endsWith(it)) {
                        return@let userDir.dropLast(it.length)
                    }
                }
            userDir
        }
        Paths.get(rootDir).also { logger.info { "Project dir is $it" } }
    }

    val webServerResourcesDir by lazy {
        projectDir.resolve("orgarif-server/src/main/resources")
    }

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
            DatabaseInitializer.initializeSchema(
                generationDatabaseConfiguration, sqlSchemaFilesDir, sqlCleanResultFile)
            logger.info { "Generate Jooq code" }
            JooqGeneration.generateJooq(
                conf = generationDatabaseConfiguration,
                excludeTables = setOf("spring_session", "spring_session_attributes"),
                generatedPackageName = "orgarif.jooq",
                generatedCodePath = projectDir.resolve("jooq-lib/src/generated/java"))
            // TODO[tmpl][doc] diff will fail if Config.runDatabase does not exist
            // (not very problematic but can be better)
            JooqGeneration.generateDiff(configuration, generationDatabaseConfiguration, buildDir)
            ResetDatabase.resetDatabaseSchema(configuration)
            ResetDatabase.insertInitialData(configuration)
        } finally {
            DatabaseInitializer.dropDb(generationDatabaseConfiguration)
        }
    }
}
