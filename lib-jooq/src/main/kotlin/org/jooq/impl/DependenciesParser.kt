package org.jooq.impl

import org.jooq.DSLContext
import org.jooq.Query
import org.jooq.Table
import orgarif.dbtooling.LocalDatasource
import orgarif.dbtooling.References
import orgarif.dbtooling.SqlQueryString
import orgarif.jooq.tools.Config

object DependenciesParser {

    data class TableDependencies(val table: Table<*>,
                                 val references: References,
                                 val createTableQuery: Query)

    data class Dependencies(val dependencies: Set<TableDependencies>,
                            val otherQueries: List<Query>)

    fun getDependencies(sqlQueries: List<SqlQueryString>, databaseName: String): Dependencies {
        val jooqDsl = DSL.using(LocalDatasource.get(databaseName), Config.jooqDialect)
        val queries = sqlQueries.flatMap { sqlQuery ->
            jooqDsl.parser().parse(sqlQuery.sql).queries().toList()
        }
        val createQueries = queries
                .filter { it is CreateTableImpl }
                .map { query ->
                    val references = (query as CreateTableImpl).`$constraints`()
                            .map { constraint ->
                                when (constraint) {
                                    is ConstraintImpl -> {
                                        constraint.`$referencesTable`()
                                    }
                                    else -> {
                                        println(constraint)
                                        null
                                    }
                                }
                            }
                            .filterNotNull()
                            .toSet()
                    val table = query.`$table`() ?: throw IllegalArgumentException()
                    Triple(table, References(references), query)
                }
        val otherQueries = queries.filter { it !is CreateTableImpl }
                .map { query ->
                    when (query) {
                        is AlterTableImpl -> {
                            val reference = query.`$addConstraint`()
                                    .let { constraint ->
                                        when (constraint) {
                                            is ConstraintImpl -> {
                                                constraint.`$referencesTable`()
                                            }
                                            else -> {
                                                println(constraint)
                                                null
                                            }
                                        }
                                    }
                            val table = query.`$table`() ?: throw IllegalArgumentException()
                            query to reference?.let { table to References(setOf(it)) }
                        }
                        is CreateSequenceImpl,
                        is CreateIndexImpl -> {
                            query to null
                        }
                        else -> throw NotImplementedError(query.javaClass.name)
                    }
                }
        val addReferencesMap = otherQueries.map { it.second }.filterNotNull().groupBy { it.first }
        val dependencies = createQueries
                .map {
                    TableDependencies(it.first, References(it.second.tables + (addReferencesMap[it.first]?.flatMap { it.second.tables }
                            ?: emptySet())), it.third)
                }
                .toSet()
        val result = Dependencies(dependencies, otherQueries.map { it.first })

        // check no duplicate
        // TODO[db-tooling] NON, peut être ajout de contrainte => check que l'erreur sql fera le job
        run {
            val tables = dependencies.map { it.table.name }
            if (tables.distinct().size != dependencies.size) {
                val duplicates = tables.groupBy { it }.filter { it.value.size > 1 }.map { it.key }
                throw IllegalArgumentException("Tables defined multiple times $duplicates")
            }
        }
        // check no cyclic reference
        run {
            val map = dependencies.map { it.table to it.references }.toMap()
            map.keys.forEach {
                checkReferences(it, map)
            }
        }
        return result
    }

    private fun checkReferences(startTable: Table<*>,
                                map: Map<Table<*>, References>,
                                tableChain: List<Table<*>> = emptyList()) {
        val checkTable = (tableChain.lastOrNull() ?: startTable)
        val references = map[checkTable]
        if (references == null) {
            val badTable = (tableChain.dropLast(1).lastOrNull() ?: startTable)
            throw IllegalStateException("Table $badTable references $checkTable which doesn't exist.")
        }
        references.tables.forEach { table ->
            if (table == startTable) {
                val chain = tableChain.map { it.name }.joinToString(" -> ")
                throw IllegalStateException("Cyclic reference ${startTable.name} -> $chain -> ${table.name}")
            }
            checkReferences(startTable, map, tableChain + table)
        }
    }
}