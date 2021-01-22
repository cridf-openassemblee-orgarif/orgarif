package orgarif

import orgarif.jooqlib.GenerateJooq
import orgarif.jooqlib.ResetDatabase
import java.util.*

object ResetTestDatabase {

    fun reset() {
        val databaseName = Properties().let {
            it.load(javaClass.classLoader.getResourceAsStream("application-test.properties"))
            it.getProperty("database.name")
        }
        // TODO do smart things with transactions ?
        ResetDatabase.resetDatabaseSchemaAndInitialData(GenerateJooq.configuration.copy(databaseName = databaseName))
    }
}