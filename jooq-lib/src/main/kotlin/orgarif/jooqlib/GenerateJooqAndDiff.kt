package orgarif.jooqlib

import orgarif.jooqlib.utils.FileUtils
import orgarif.jooqlib.utils.SpringLikeYamlConfigUtils
import mu.KotlinLogging
import java.io.FileInputStream
import jooqutils.DatabaseConfiguration
import jooqutils.DatabaseInitializer
import jooqutils.JooqGeneration

fun main() {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    GenerateJooqAndDiff.generate()
    GenerateJooqAndDiff.logger.info { "[OK] Jooq generation" }
}

object GenerateJooqAndDiff {

    internal val logger = KotlinLogging.logger {}

    val configuration by lazy {
        val config = SpringLikeYamlConfigUtils
            .yamlFilesToMap(
                *listOf(
                    "application-dev.yaml",
                    "application-dev-${System.getenv("USER")}.yaml"
                ).map { FileInputStream(webServerResourcesDir.resolve(it).toFile()) }.toTypedArray()
            )
        DatabaseConfiguration(
            DatabaseConfiguration.Driver.psql,
            config.getValue("database.host"),
            config.getValue("database.port").toInt(),
            config.getValue("database.name"),
            config.getValue("database.user"),
            config.getValue("database.password"),
            setOf("public"),
            config.get("pgquarrel")
        )
    }

    val webServerResourcesDir by lazy {
        FileUtils.projectBasePath().resolve("nodes-server/src/main/resources")
    }

    val sqlSchemaFilesDir by lazy { webServerResourcesDir.resolve("data/schema") }

    val sqlInsertFilesDir by lazy { webServerResourcesDir.resolve("data/insert") }

    val buildDir by lazy { FileUtils.projectBasePath().resolve("jooq-lib/build") }

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
                "nodes.jooq",
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