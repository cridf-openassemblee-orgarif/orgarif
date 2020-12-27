package orgarif.jooq.tools

import com.google.common.hash.Hashing
import mu.KotlinLogging
import org.jooq.codegen.GenerationTool
import org.jooq.impl.DSL
import orgarif.dbtooling.DatabaseCleaner
import orgarif.dbtooling.DatabaseInitializer
import orgarif.dbtooling.LocalDatasource
import orgarif.dbtooling.jooq.JooqConfiguration
import orgarif.dbtooling.util.ShellRunner
import orgarif.jooq.tools.jooq.JooqGeneratorStrategy
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

private val logger = run {
    System.setProperty("logback.configurationFile", "logback-jooq-tooling.xml")
    KotlinLogging.logger {}
}

/*
TODO[db-tooling][doc]
Deux premiers use case de cet outillage permettent d'appréhender assez clairement sa complexité technique.
Pour créer les tables, il est nécessaire de commencer par celles qui n'ont pas de référence (donc de dépendence),
puis dérouler l'arbre vers le bas.
Pour supprimer les tables, il est nécessaire de commencer par les tables dont aucune autre ne dépend, puis remonter
l'arbre de dépendances.
Dans le cadre de la création de la base, le schema est défini dans différents fichiers. Aucune contrainte n'est alors
imposée à l'utilisateur dans l'ordre de définition des tables de son schéma.
Pour la suppression, un dump de la structure sera utilisé.
 */

fun main() {
    when (Config.driver) {
        Config.Driver.psql -> psqlGenerate()
        Config.Driver.mysql -> generateMysql()
    }.let { Unit }
    logger.info { "[OK] Jooq generation" }
}

fun psqlGenerate() {
    val generationDatabaseName = Config.runDatabase + "-" + UUID.randomUUID().toString().replace("-", "")
    logger.info { "Generation via base $generationDatabaseName" }
    try {
        DatabaseInitializer.createDb(Config.runDatabase)
        DatabaseInitializer.createDb(generationDatabaseName)
        val runDatabaseJooqDSL = DSL.using(LocalDatasource.get(Config.runDatabase), Config.jooqDialect)
        val generationDatabaseJooqDSL = DSL.using(LocalDatasource.get(generationDatabaseName), Config.jooqDialect)
        logger.info { "Generate Jooq code" }
        generateJooq(generationDatabaseName, Config.schemas)
        generateDiff(generationDatabaseName)
        logger.info { "Clean database \"${Config.runDatabase}\"" }
        DatabaseCleaner.clean(Config.runDatabase)
        logger.info { "Initialize database \"${Config.runDatabase}\"" }
        DatabaseInitializer.initialize(Config.runDatabase, Config.sqlFilesUrl)
    } finally {
        DatabaseInitializer.dropDb(generationDatabaseName)
    }
}

fun generateMysql() {
    if (Config.schemas.isNotEmpty()) {
        logger.info { "Schemas list should be empty with MySQL" }
    }
    DatabaseInitializer.createDb(Config.runDatabase)
    DatabaseCleaner.clean(Config.runDatabase)
    generateJooq(Config.runDatabase, setOf(Config.runDatabase))
}

fun generateJooq(databaseName: String, schemas: Set<String>) {
    DatabaseInitializer.initialize(databaseName, Config.sqlFilesUrl)
    GenerationTool.generate(JooqConfiguration.generateConfiguration(
            databaseName = databaseName,
            schemas = schemas,
            excludeTables = setOf("SPRING_SESSION", "SPRING_SESSION_ATTRIBUTES"),
            generatedPackageName = "jooq",
            generatedCodePath = "lib-jooq/src/generated/java",
            generatorStrategyClass = JooqGeneratorStrategy::class))
}

fun generateDiff(databaseName: String) {
    val hashRunDatabase = dumpHash(Config.runDatabase)
    val hashGenerateDatabase = dumpHash(databaseName)
    if (hashRunDatabase != hashGenerateDatabase) {
        val commandResult = ShellRunner.run(Config.pgQuarrel,
                "--source-host=localhost",
                "--source-port=5432",
                "--source-dbname=$databaseName",
                "--source-user=${System.getProperty("user.name")}",
                "--source-no-password",
                "--target-host=localhost",
                "--target-port=5432",
                "--target-dbname=${Config.runDatabase}",
                "--target-user=${System.getProperty("user.name")}",
                "--target-no-password")
        val diff = commandResult.lines.fold("") { acc, s -> acc + "\n" + s }
        val file = Paths.get(System.getProperty("user.dir"), "/lib-jooq/build/db-diff/diff-" +
                hashRunDatabase.substring(0, 8) + "-" + hashGenerateDatabase.substring(0, 8) + ".sql")
        logger.info { "Writing diff to $file" }
        file.toFile().parentFile.mkdirs()
        Files.write(file, diff.toByteArray(Charsets.UTF_8))
    }
}

fun dumpHash(databaseName: String): String {
    val dumpResult = DatabaseInitializer.dump(databaseName)
    val dump = dumpResult.lines.reduce { acc, s -> "$acc\n$s" }
    return Hashing.sha256()
            .hashString(dump, Charsets.UTF_8)
            .toString()
}