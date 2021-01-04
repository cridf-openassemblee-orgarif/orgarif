package orgarif.dbtooling.jooq

import org.jooq.codegen.Generator
import org.jooq.codegen.JavaGenerator
import org.jooq.meta.Database

@Deprecated("Only used by other deprecated stuff")
open class DatabaseDescriptionProviderGenerator(val handler: (db: Database) -> Unit) : Generator by JavaGenerator() {

    override fun generate(db: Database) = handler(db)

}