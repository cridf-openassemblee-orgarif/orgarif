package orgarif.dbtooling

import org.jooq.meta.Database
import org.jooq.meta.TableDefinition

@Deprecated("DependenciesParser now")
object DatabaseRelations {

    // TODO[db-tooling] pk db.schemata useless
    fun getDependencies(databaseDescription: Database, schemas: Set<String>): Map<TableDefinition, Set<TableDefinition>> {
        val tables = schemas.flatMap {
            databaseDescription.getTables(databaseDescription.getSchema(it))
        }
        val relations = tables
                .flatMap { table ->
                    table.foreignKeys.map { foreignKey ->
                        foreignKey.referencedTable to table
                    }
                }
                .groupBy { it.first }
                .mapValues { it.value.map { it.second }.toSet() }
        return tables
                .associateWith { relations[it] ?: emptySet() }
    }

}