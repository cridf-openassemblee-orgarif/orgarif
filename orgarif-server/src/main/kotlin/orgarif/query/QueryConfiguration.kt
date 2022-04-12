package orgarif.query

import orgarif.domain.Role

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
            is IsMailAlreadyTakenQuery -> null
        }
}
