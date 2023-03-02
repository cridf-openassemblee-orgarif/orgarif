package orgarif

import orgarif.jooqlib.Configuration
import orgarif.jooqlib.ResetDatabase
import orgarif.jooqlib.utils.SpringLikeYamlConfigUtils

object ResetTestDatabase {

    fun resetDatabaseSchema(insertInitialData: Boolean) {
        // FIXME[tmpl] vs transaction strategy vs containers
        val databaseName =
            SpringLikeYamlConfigUtils.yamlFilesToMap(
                    ResetTestDatabase.javaClass.classLoader.getResourceAsStream(
                        "application-test.yaml"))
                .getValue("database.name")
        val configuration = Configuration.configuration.copy(databaseName = databaseName)
        ResetDatabase.resetDatabaseSchema(configuration)
        if (insertInitialData) {
            ResetDatabase.insertInitialData(configuration)
        }
    }
}
