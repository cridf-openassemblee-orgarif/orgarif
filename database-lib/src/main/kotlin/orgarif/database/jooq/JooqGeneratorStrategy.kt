package orgarif.database.jooq

import org.jooq.codegen.DefaultGeneratorStrategy
import org.jooq.codegen.GeneratorStrategy
import org.jooq.meta.Definition
import org.jooq.meta.mysql.MySQLTableDefinition
import org.jooq.meta.postgres.PostgresTableDefinition

class JooqGeneratorStrategy(val namePrefix: String = "") : DefaultGeneratorStrategy() {

    override fun getJavaClassName(definition: Definition, mode: GeneratorStrategy.Mode?) =
        when (mode) {
            GeneratorStrategy.Mode.DEFAULT ->
                namePrefix + super.getJavaClassName(definition, mode) + "Table"
            GeneratorStrategy.Mode.RECORD -> namePrefix + super.getJavaClassName(definition, mode)
            GeneratorStrategy.Mode.DAO,
            GeneratorStrategy.Mode.DOMAIN,
            GeneratorStrategy.Mode.ENUM,
            GeneratorStrategy.Mode.INTERFACE,
            GeneratorStrategy.Mode.POJO,
            GeneratorStrategy.Mode.SYNTHETIC_DAO -> super.getJavaClassName(definition, mode)
            null -> throw RuntimeException()
        }

    override fun getJavaIdentifier(definition: Definition?) =
        if (definition is PostgresTableDefinition || definition is MySQLTableDefinition) {
            namePrefix.let { if (it != "") it.uppercase() + "_" else it } +
                super.getJavaIdentifier(definition)
        } else {
            super.getJavaIdentifier(definition)
        }
}
