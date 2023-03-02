package orgarif.query

import orgarif.domain.Role
import orgarif.domain.Role.Admin

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
            is GetUserInfosQuery -> Admin
            is GetUsersQuery -> Admin
            is IsMailAlreadyTakenQuery -> null
        }
}
