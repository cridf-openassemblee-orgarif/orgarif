package orgarif.dbtooling

import mu.KotlinLogging
import org.jooq.Table
import org.jooq.impl.DependenciesParser
import java.sql.Statement

object DatabaseCleaner {

    private val logger = KotlinLogging.logger {}

    fun clean(databaseName: String) {
        val commandResult = DatabaseInitializer.dump(databaseName)
        val schema = commandResult.lines
                // psql dump
                .filter { !it.startsWith("SELECT pg_catalog.set_config") }
                .filter { !it.startsWith("ALTER SEQUENCE") }
                .filter { !it.startsWith("CREATE INDEX") }
                .filter { !it.startsWith("CREATE UNIQUE INDEX") }
                // mysql dump
                .filter { !it.startsWith("DROP TABLE") }
                .filter { "SET DEFAULT nextval" !in it }
                .reduce { acc, s -> acc + "\n" + s }.let { SqlQueryString(it) }
        val dependencies = DependenciesParser.getDependencies(listOf(schema), databaseName)
        val reversed = reverseDependencies(dependencies.dependencies)
        LocalDatasource.get(databaseName).connection.createStatement().use { statement ->
            dropTables(reversed, emptySet(), statement)
        }
    }

    fun reverseDependencies(dependencies: Set<DependenciesParser.TableDependencies>): List<Pair<Table<*>, References>> {
        val relations = dependencies
                .flatMap { (table, references) ->
                    references.tables.map { reference ->
                        reference to table
                    }
                }
                .groupBy { it.first }
                .mapValues { References(it.value.map { it.second }.toSet()) }
        return dependencies
                .map { it.table to (relations[it.table] ?: References(emptySet())) }

    }

    private fun dropTables(relations: List<Pair<Table<*>, References>>,
                           alreadyDroped: Set<Table<*>>,
                           statement: Statement) {
        val dropTables = relations
                .filter { (it.second.tables - alreadyDroped).isEmpty() }
                .map { it.first }
                .toSet()
        logger.debug { "Clean ${dropTables.map { it.name }}" }
        dropTables.forEach {
            statement.execute("drop table if exists ${it.name}")
        }
        val remainingRelations = relations.filter { it.first !in dropTables }
        if (remainingRelations.isNotEmpty()) {
            dropTables(remainingRelations, alreadyDroped + dropTables, statement)
        }
    }
}