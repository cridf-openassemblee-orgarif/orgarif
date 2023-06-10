package orgarif.utils.database

import java.nio.file.Files
import kotlin.io.path.ExperimentalPathApi
import kotlin.io.path.absolutePathString
import kotlin.io.path.deleteRecursively
import orgarif.utils.ShellRunner
import orgarif.utils.replaceRecurvice

@OptIn(ExperimentalPathApi::class)
object CompareDatabase {
    fun compare(env: String, database: CloudDatabasesConfiguration.Database) {
        val tempDb = "orgarif-$env-schema-comparison"
        // doesn't work as simply with psql -c ""
        val tempDir = Files.createTempDirectory(tempDb)
        val schemaFile = tempDir.resolve("schema.sql")
        val pgquarrelConf = tempDir.resolve("pgquarrel-config.properties")
        fun compare() {
            val command =
                (database.databasePassword?.let { "PGPASSWORD=$it " }
                    ?: "") +
                    "pg_dump " +
                    (database.databaseHost?.let { "-h $it " } ?: "") +
                    (database.databasePort?.let { "-p $it " } ?: "") +
                    (database.databaseUser?.let { "-U $it " } ?: "") +
                    "-d ${database.databaseName} " +
                    "-n public --schema-only"
            val schemaResult = ShellRunner.run(command)
            if (schemaResult.result != 0) {
                println(schemaResult.errorOutput)
                throw IllegalStateException(
                    "Could not copy database schema => try to grant rights ! Error ${schemaResult.result}")
            }
            ShellRunner.run("createdb $tempDb")
            Files.write(
                schemaFile,
                schemaResult.output.joinToString(separator = "\n").toByteArray(Charsets.UTF_8))
            ShellRunner.run("psql -d $tempDb < ${schemaFile.absolutePathString()}")
            Files.write(
                pgquarrelConf,
                """
[target]
host = localhost
port = 5432
dbname = $tempDb
user = ${System.getProperty("user.name")}
no-password = true

[source]
host = localhost
port = 5432
dbname = orgarif
user = ${System.getProperty("user.name")}
no-password = true
        """
                    .trimIndent()
                    .toByteArray(Charsets.UTF_8))
            val r = ShellRunner.run("pgquarrel -c ${pgquarrelConf.absolutePathString()}")
            r.output
                .filter { !it.startsWith("DROP FUNCTION ") }
                .filter { !it.startsWith("DROP TYPE ") }
                .joinToString(separator = "\n")
                .replace(" ONLY public.", " ")
                .let { it.replaceRecurvice("\n\n\n", "\n") }
                .let { println(it) }
        }
        try {
            ShellRunner.run("dropdb $tempDb")
            compare()
        } finally {
            ShellRunner.run("dropdb $tempDb")
            tempDir.deleteRecursively()
        }
    }
}
