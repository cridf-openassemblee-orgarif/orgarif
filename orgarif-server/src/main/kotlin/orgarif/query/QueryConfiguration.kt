package orgarif.query

import orgarif.domain.Role
import orgarif.domain.Role.*

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
            is GetUsersListQuery -> Admin
            is IsMailAlreadyTakenQuery -> null
        }
}
