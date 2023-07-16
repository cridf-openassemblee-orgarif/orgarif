package orgarif.database.utils

import net.sf.jsqlparser.parser.CCJSqlParserUtil
import net.sf.jsqlparser.statement.alter.Alter
import net.sf.jsqlparser.statement.create.table.CreateTable
import net.sf.jsqlparser.statement.create.table.ForeignKeyIndex
import orgarif.database.utils.SqlDependenciesResolver.ParseResult

object SqlDependenciesResolver {

    // TODO test crossing tables inside a given file
    // file 1 : t1 + t2, t1 depend de t3
    // file 2 : t3 qui depend de t2
    sealed class ParseResult {
        // exists to be compared in collection operations
        // (CreateTable.table != ForeignKeyIndex.table)
        data class Table(val name: String)
        data class CreateTable(
            val table: Table,
            val foreignKeys: List<ForeignKeyIndex>,
            val createTableSql: String
        ) : ParseResult()
        data class PostponeSql(val sql: String) : ParseResult()
    }

    /**
     * Resolve will NOT rewrite SQL queries. For crossed foreign keys, one foreign key must be in an
     * "autonomous" ADD FOREIGN KEY query
     */
    fun resolveSql(sql: List<String>): List<String> {
        val parseResults =
            sql.flatMap { part ->
                    val noComment =
                        part
                            .split("\n")
                            .filter { !it.startsWith("--") }
                            .joinToString(separator = "\n")
                    val parts = noComment.split(";").map { it.trim() }.filter { it.isNotBlank() }
                    val jSqlParsable = parts.groupBy(this::jSqlParserUtilFilter)
                    val parseResults =
                        (jSqlParsable[true] ?: emptyList()).map {
                            when (val parsed = CCJSqlParserUtil.parse(it)) {
                                is CreateTable ->
                                    ParseResult.CreateTable(
                                        ParseResult.Table(parsed.table.name),
                                        parsed.indexes?.filterIsInstance<ForeignKeyIndex>()
                                            ?: emptyList(),
                                        it)
                                is Alter -> ParseResult.PostponeSql(it)
                                else -> throw NotImplementedError("${parsed.javaClass} $parsed")
                            }
                        }
                    parseResults +
                        (jSqlParsable[false] ?: emptyList()).map { ParseResult.PostponeSql(it) }
                }
                .toSet()
        // check references exist & no cyclic reference
        let {
            val map: Map<ParseResult.Table, ParseResult.CreateTable> =
                parseResults.filterIsInstance<ParseResult.CreateTable>().associateBy { it.table }
            map.keys.forEach { checkForeignKeys(listOf(it), map) }
        }
        val resolved =
            doResolveSql(parseResults.filterIsInstance<ParseResult.CreateTable>().toSet())
        return resolved.map { it.createTableSql + ";\n" } +
            parseResults.filterIsInstance<ParseResult.PostponeSql>().map { it.sql + ";\n" }
    }

    private fun jSqlParserUtilFilter(query: String) = !query.startsWith("CREATE INDEX")

    private fun checkForeignKeys(
        tableChain: List<ParseResult.Table>,
        map: Map<ParseResult.Table, ParseResult.CreateTable>
    ) {
        val parseResult = map.getValue(tableChain.last())
        parseResult.foreignKeys
            .filter {
                // table referencing itself is authorized
                ParseResult.Table(it.table.name) != tableChain.last()
            }
            .forEach { foreignKey ->
                if (ParseResult.Table(foreignKey.table.name) !in map.keys) {
                    throw IllegalArgumentException(
                        "Table ${tableChain.last()} references ${foreignKey.table.name} which isn't described.")
                }
                if (ParseResult.Table(foreignKey.table.name) == tableChain.first()) {
                    val chain = tableChain.map { it.name }.joinToString(" -> ")
                    throw IllegalArgumentException(
                        "Cyclic reference $chain -> ${foreignKey.table.name}. " +
                            "Think about using an 'ALTER TABLE [...] ADD FOREIGN KEY [...]' query.")
                }
                checkForeignKeys(tableChain + ParseResult.Table(foreignKey.table.name), map)
            }
    }

    private fun doResolveSql(
        parseResults: Set<ParseResult.CreateTable>,
        resolvedTables: Set<ParseResult.Table> = emptySet()
    ): List<ParseResult.CreateTable> {
        val resolve =
            parseResults
                .filter { it.table !in resolvedTables }
                .filter { parsed ->
                    (parsed.foreignKeys.map { ParseResult.Table(it.table.name) } -
                            resolvedTables -
                            // table can reference itselft
                            parsed.table)
                        .isEmpty()
                }
        val newResolvedTables = resolvedTables + resolve.map { it.table }
        return if (parseResults.size == newResolvedTables.size) {
            resolve
        } else {
            if (resolve.isEmpty()) {
                val missing = parseResults.map { it.table } - resolvedTables
                throw RuntimeException("Missing $missing")
            }
            resolve + doResolveSql(parseResults, newResolvedTables)
        }
    }
}
