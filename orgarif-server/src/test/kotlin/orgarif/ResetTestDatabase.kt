package orgarif

import orgarif.jooqlib.Configuration
import orgarif.jooqlib.ResetDatabase

object ResetTestDatabase {

    // TODO do smart things with transactions ?
    fun reset(insertInitialData: Boolean) =
        ResetDatabase.resetDatabaseSchema(Configuration.configuration("application-test.yaml"), insertInitialData)

}