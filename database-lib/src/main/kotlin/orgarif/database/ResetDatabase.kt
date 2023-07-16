package orgarif.database

import java.nio.file.Files
import java.sql.Connection
import java.sql.DriverManager
import mu.KotlinLogging
import org.jooq.DSLContext
import org.jooq.impl.DSL
import orgarif.database.GenerateJooqAndDiff.sqlInitiateSchemaResultFile
import orgarif.database.GenerateJooqAndDiff.sqlInsertFilesDir
import orgarif.database.GenerateJooqAndDiff.sqlSchemaFilesDir
import orgarif.database.domain.PsqlDatabaseConfiguration
import orgarif.database.utils.DatabaseUtils
import orgarif.database.utils.SqlDependenciesResolver

fun main() {
    System.setProperty("logback.configurationFile", "logback-database-lib.xml")
    DatabaseUtils.createDatabaseIfNeeded(psqlDatabaseConfiguration)
    DriverManager.getConnection(
            psqlDatabaseConfiguration.jdbcUrl(),
            psqlDatabaseConfiguration.user,
            psqlDatabaseConfiguration.password)
        .use { ResetDatabase.resetDatabaseSchema(it, insertData = true) }
    ResetDatabase.logger.info {
        "[OK] reset database \"${psqlDatabaseConfiguration.databaseName}\""
    }
}

object ResetDatabase {
    // [doc] generated directory can be deleted if there is a problem
    internal val logger = KotlinLogging.logger {}

    fun resetDatabaseSchema(connection: Connection, insertData: Boolean) {
        logger.info {
            "Reset schema \"${PsqlDatabaseConfiguration.schema}\", using directory: $sqlSchemaFilesDir"
        }
        val jooq = DSL.using(connection)
        cleanSchema(jooq, PsqlDatabaseConfiguration.schema)
        initializeSchema(jooq, PsqlDatabaseConfiguration.schema)
        if (insertData) {
            insertInitialData(jooq)
        }
    }

    private fun cleanSchema(jooq: DSLContext, schema: String) {
        jooq.dropSchema(schema).cascade().execute()
        jooq.createSchema(schema).execute()
    }

    private fun initializeSchema(jooq: DSLContext, schema: String) {
        val sqlQueries =
            sqlSchemaFilesDir
                .toFile()
                .walk()
                .filter { it.extension == "sql" }
                .map { Files.readString(it.toPath()) }
                .toList()
        val resolved = SqlDependenciesResolver.resolveSql(sqlQueries)
        jooq.transaction { _ -> resolved.forEach { jooq.execute(it) } }

        val initScript =
            "BEGIN TRANSACTION;\n" + resolved.joinToString(separator = "\n") + "COMMIT;"
        Files.write(sqlInitiateSchemaResultFile, initScript.toByteArray())
    }

    private fun insertInitialData(jooq: DSLContext) {
        logger.info { "Insert initial data, using directory: $sqlInsertFilesDir" }
        val sqlQueries =
            sqlInsertFilesDir
                .toFile()
                .walk()
                .filter { it.extension == "sql" }
                .map { Files.readString(it.toPath()) }
                .toList()
        sqlQueries.forEach { jooq.execute(it) }
    }
}
