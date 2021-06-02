package orgarif

import orgarif.jooqlib.GenerateJooqAndDiff
import orgarif.jooqlib.ResetDatabase
import java.util.*

object ResetTestDatabase {

    fun reset(insertInitialData: Boolean) {
        val databaseName = Properties().let {
            it.load(javaClass.classLoader.getResourceAsStream("application-test.properties"))
            it.getProperty("database.name")
        }
        // TODO do smart things with transactions ?
        ResetDatabase.resetDatabaseSchema(
            GenerateJooqAndDiff.configuration.copy(databaseName = databaseName),
            insertInitialData
        )
    }
}