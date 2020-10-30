package orgarif.dbtooling

import com.google.common.io.ByteStreams
import mu.KotlinLogging
import org.jooq.Table
import org.jooq.impl.DependenciesParser
import orgarif.dbtooling.util.ShellRunner
import orgarif.jooq.tools.Config
import java.io.File
import java.net.URL
import java.sql.Statement

object DatabaseInitializer {

    private val logger = KotlinLogging.logger {}

    fun dump(databaseName: String) = when (Config.driver) {
        Config.Driver.psql -> ShellRunner.run("pg_dump", "-s", databaseName, "--schema-only")
        Config.Driver.mysql -> ShellRunner.run("mysqldump", "--no-data", "-u", "root", databaseName)
    }

    fun createDb(databaseName: String)=
            when (Config.driver) {
                Config.Driver.psql -> ShellRunner.run("createdb $databaseName")
                Config.Driver.mysql -> LocalDatasource.get().connection.createStatement().use { statement ->
                    statement.execute("create database if not exists `$databaseName`")
                }
            }.let { Unit }

    fun dropDb(databaseName: String): Unit =
            when (Config.driver) {
                Config.Driver.psql -> ShellRunner.run("dropdb $databaseName")
                Config.Driver.mysql -> LocalDatasource.get().connection.createStatement().use { statement ->
                    statement.execute("drop database if exists `$databaseName`;")
                }
            }.let { Unit }

    fun initialize(databaseName: String, sqlFilesPath: URL) {
        val sqlQueries = File(sqlFilesPath.path).listFiles()
                .filter { it.name.endsWith(".sql") }
                .map {
                    ByteStreams
                            .toByteArray(it.inputStream())
                            .toString(Charsets.UTF_8)
                            .let { SqlQueryString(it) }
                }
        val dependencies = DependenciesParser.getDependencies(sqlQueries, databaseName)
        LocalDatasource.get(databaseName).connection.createStatement().use { statement ->
            createTables(dependencies.dependencies, emptySet(), statement)
            dependencies.otherQueries.forEach {
                statement.execute(it.sql)
            }
        }
    }

    private fun createTables(dependencies: Set<DependenciesParser.TableDependencies>,
                             alreadyCreated: Set<Table<*>>,
                             statement: Statement) {
        val createTables = dependencies
                .filter { (it.references.tables - alreadyCreated).isEmpty() }
        logger.debug { "Create ${createTables.map { it.table.name }}" }
        createTables.forEach {
            statement.execute(it.createTableQuery.sql)
        }
        val created = createTables.map { it.table }
        val remainingTables = dependencies.filter { it.table !in created }.toSet()
        if (remainingTables.isNotEmpty()) {
            createTables(remainingTables, alreadyCreated + created, statement)
        }
    }
}