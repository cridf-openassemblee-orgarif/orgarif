package orgarif.jooqlib.utils

import javax.sql.DataSource
import org.postgresql.ds.PGSimpleDataSource
import orgarif.jooqlib.domain.PsqlDatabaseConfiguration

object DatasourcePool {

    private val map by lazy { mutableMapOf<PsqlDatabaseConfiguration, DataSource>() }

    fun get(configuration: PsqlDatabaseConfiguration) =
        synchronized(this) {
            map.get(configuration)
                ?: let {
                    val datasource = createDatasource(configuration)
                    map[configuration] = datasource
                    datasource
                }
        }

    private fun createDatasource(configuration: PsqlDatabaseConfiguration): DataSource =
        PGSimpleDataSource().apply {
            serverNames = arrayOf(configuration.host)
            portNumbers = intArrayOf(configuration.port)
            user = configuration.user
            password = configuration.password
            databaseName = configuration.databaseName
        }
}
