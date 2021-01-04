package orgarif.jooq.tools

import org.jooq.SQLDialect
import java.util.*

object Config {

    enum class Driver {
        psql, mysql
    }

    val sqlFilesUrl = Config::class.java.classLoader.getResource("data")

    val properties by lazy {
        Properties().apply {
            load(Config::class.java.classLoader.getResourceAsStream("config-${System.getProperty("user.name")}.properties"))
        }
    }

    // TODO[db-tooling] : bah plusieurs, pour les tests...
    val runDatabase by lazy { properties.getProperty("databaseName") }
    val schemas by lazy { properties.getProperty("schemas").split(",").map { it.trim() }.toSet() }
    val pgQuarrel by lazy { properties.getProperty("pgquarrel") }
    val driver = Driver.valueOf(properties.getProperty("driver"))
    val localUser = when (driver) {
        Driver.psql -> System.getenv("USER")
        Driver.mysql -> "root"
    }
    val jooqDialect = when (driver) {
        Driver.psql -> SQLDialect.POSTGRES
        Driver.mysql -> SQLDialect.MYSQL
    }
}