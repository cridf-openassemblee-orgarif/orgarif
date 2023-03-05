package orgarif.utils.database

object CloudDatabasesConfiguration {
    interface Database {
        val databaseName: String
        val databaseHost: String
        val databasePort: Int
        val databaseUser: String
    }
    object Prod : Database {
        override val databaseName = "bosuon7gzjgeh6baag99"
        override val databaseHost = "$databaseName-postgresql.services.clever-cloud.com"
        override val databasePort = 5132
        override val databaseUser = "urojwyxdqjtja3e595mz"
    }
    object Staging : Database {
        override val databaseName = "bjg5euhjrhastc12cumm"
        override val databaseHost = "$databaseName-postgresql.services.clever-cloud.com"
        override val databasePort = 5562
        override val databaseUser = "u6ntkekippqttzxk2gii"
    }
}
