package orgarif.utils

import orgarif.utils.database.CloudDatabasesConfiguration
import orgarif.utils.database.CompareDatabase

fun main() {
    System.setProperty("logback.configurationFile", "logback-utils.xml")
    CompareDatabase.compare("prod", CloudDatabasesConfiguration.Prod)
}
