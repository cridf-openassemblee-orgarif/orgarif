package orgarif.utils.database

object CloudDatabasesConfiguration {
    abstract class Database {
        abstract val databaseName: String
        open val databaseHost: String? = null
        open val databasePort: Int? = null
        open val databaseUser: String? = null
        open val databasePassword: String? = null
    }
    object Prod : Database() {
        override val databaseName = "bosuon7gzjgeh6baag99"
        override val databaseHost = "$databaseName-postgresql.services.clever-cloud.com"
        override val databasePort = 5132
        override val databaseUser = "urojwyxdqjtja3e595mz"
    }
    object ProdCopy : Database() {
        override val databaseName = "orgarif-prod-schema"
    }
    object Staging : Database() {
        override val databaseName = "bjg5euhjrhastc12cumm"
        override val databaseHost = "$databaseName-postgresql.services.clever-cloud.com"
        override val databasePort = 5562
        override val databaseUser = "u6ntkekippqttzxk2gii"
    }
}
