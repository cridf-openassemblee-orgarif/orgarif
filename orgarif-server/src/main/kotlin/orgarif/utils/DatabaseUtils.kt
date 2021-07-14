package orgarif.utils

import orgarif.jooqlib.Configuration.configuration
import org.postgresql.ds.PGSimpleDataSource

object DatabaseUtils {

    val datasource by lazy {
        PGSimpleDataSource().apply {
            serverNames = arrayOf(configuration.host)
            portNumbers = intArrayOf(configuration.port)
            databaseName = configuration.databaseName
            user = configuration.user
            password = configuration.password
        }
    }

}