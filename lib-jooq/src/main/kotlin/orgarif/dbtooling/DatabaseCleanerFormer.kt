package orgarif.dbtooling

import mu.KotlinLogging
import org.jooq.DSLContext
import org.jooq.codegen.GenerationTool
import org.jooq.meta.TableDefinition
import orgarif.dbtooling.jooq.DatabaseDescriptionProviderGenerator
import orgarif.dbtooling.jooq.JooqConfiguration

@Deprecated("Use DatabaseCleaner")
object DatabaseCleanerFormer {

    private val logger = KotlinLogging.logger {}

    var databaseName: String? = null
    var schemas: Set<String>? = null
    var jooqDsl: DSLContext? = null

    class CleaningGenerator : DatabaseDescriptionProviderGenerator({ database ->
        val relations = DatabaseRelations.getDependencies(database, schemas ?: throw IllegalStateException())
        dropTables(relations, emptySet(), jooqDsl ?: throw IllegalStateException())
    })

    @Synchronized
    fun clean(databaseName: String, schemas: Set<String>, jooqDsl: DSLContext) {
        this.schemas = schemas
        this.jooqDsl = jooqDsl
        val jooqConfiguration = JooqConfiguration.generateConfiguration(
                databaseName = databaseName,
                schemas = schemas,
                excludeTables = emptySet(),
                generatorClass = CleaningGenerator::class
        )
        GenerationTool.generate(jooqConfiguration)
    }

    private fun dropTables(relations: Map<TableDefinition, Set<TableDefinition>>,
                           alreadyDroped: Set<TableDefinition>,
                           jooqDsl: DSLContext) {
        val dropTables = relations.entries
                .filter { (it.value - alreadyDroped).isEmpty() }
                .map { it.key }
                .toSet()
        logger.info { "Clean ${dropTables.map { it.name }}" }
        dropTables.forEach {
            jooqDsl.dropTableIfExists(it.name).execute()
        }
        val remainingRelations = relations.filter { it.key !in dropTables }
        if (remainingRelations.isNotEmpty()) {
            dropTables(remainingRelations, alreadyDroped + dropTables, jooqDsl)
        }
    }
}