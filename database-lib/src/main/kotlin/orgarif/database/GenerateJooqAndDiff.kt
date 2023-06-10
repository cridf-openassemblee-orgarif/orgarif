package orgarif.database

import java.nio.file.Paths
import mu.KotlinLogging
import orgarif.database.jooq.JooqGeneration
import orgarif.database.utils.ShellRunner

fun main() {
    System.setProperty("logback.configurationFile", "logback-database-lib.xml")
    GenerateJooqAndDiff.generate()
    GenerateJooqAndDiff.logger.info { "[OK] Jooq generation" }
}

object GenerateJooqAndDiff {

    internal val logger = KotlinLogging.logger {}

    val projectDir by lazy {
        // contexts: run in intellij, gradle (with different root dirs), tests
        val userDir = System.getProperty("user.dir")
        val rootDir = let {
            listOf(
                    "/database-lib",
                    // (in tests)
                    "/orgarif-server",
                )
                .firstOrNull { userDir.endsWith(it) }
                ?.let { userDir.dropLast(it.length) }
                ?: userDir
        }
        Paths.get(rootDir).also { logger.info { "Project dir is $it" } }
    }

    val webServerResourcesDir by lazy { projectDir.resolve("orgarif-server/src/main/resources") }

    val sqlSchemaFilesDir by lazy { webServerResourcesDir.resolve("data/schema") }

    val sqlInsertFilesDir by lazy { webServerResourcesDir.resolve("data/insert") }

    val buildDir by lazy { projectDir.resolve("database-lib/build") }

    val sqlInitiateSchemaResultFile by lazy { buildDir.resolve("initiate-database.sql") }

    fun generate() {
        logger.info { "Generate Jooq" }
        val generationDatabaseConfiguration =
            psqlDatabaseConfiguration.copy(
                databaseName = psqlDatabaseConfiguration.databaseName + "-dbtooling")
        logger.info { "Generation via base ${generationDatabaseConfiguration.databaseName}" }
        try {
            ResetDatabase.resetDatabaseSchema(generationDatabaseConfiguration, insertData = false)
            logger.info { "Generate Jooq code" }
            JooqGeneration.generateJooq(
                conf = generationDatabaseConfiguration,
                excludeTables = setOf("spring_session", "spring_session_attributes"),
                generatedPackageName = "orgarif.jooq",
                generatedCodePath = projectDir.resolve("database-lib/src/generated/kotlin"))
            // TODO[tmpl][doc] diff will fail if Config.runDatabase does not exist
            // (not very problematic but can be better)
            JooqGeneration.generateDiff(
                psqlDatabaseConfiguration, generationDatabaseConfiguration, buildDir)
            ResetDatabase.resetDatabaseSchema(psqlDatabaseConfiguration, insertData = true)
            logger.info { "Format codebase" }
            ShellRunner.run(projectDir, "./ktfmt")
        } finally {
            ResetDatabase.dropDatabase(generationDatabaseConfiguration)
        }
    }
}
