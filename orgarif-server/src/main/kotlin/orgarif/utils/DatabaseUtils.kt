package orgarif.utils

import org.postgresql.ds.PGSimpleDataSource
import orgarif.jooqlib.Configuration.configuration

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
