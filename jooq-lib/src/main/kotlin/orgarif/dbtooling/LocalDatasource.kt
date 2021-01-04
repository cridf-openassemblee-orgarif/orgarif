package orgarif.dbtooling

import com.mysql.cj.jdbc.MysqlDataSource
import orgarif.jooq.tools.Config

object LocalDatasource {

    fun get() = when (Config.driver) {
        Config.Driver.psql -> TODO()
        Config.Driver.mysql -> MysqlDataSource().apply {
            serverName = "localhost"
            user = Config.localUser
            password = ""
            serverTimezone = "UTC"
        }
    }

    fun get(databaseName: String) = get().apply {
        this.databaseName = databaseName
    }

}