package orgarif.jooqlib.domain

data class PsqlDatabaseConfiguration(
    val host: String,
    val port: Int,
    val databaseName: String,
    val user: String,
    val password: String?,
    val schema: String
) {
    fun jdbcUrl() = "jdbc:postgresql://${host}/${databaseName}"
}
