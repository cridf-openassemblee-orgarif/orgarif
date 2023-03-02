package orgarif.query

import orgarif.domain.Role
import orgarif.domain.Role.Admin

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
<<<<<<< HEAD
            is GetOrganismeQuery -> null
=======
            is GetUserInfosQuery -> Admin
            is GetUsersQuery -> Admin
>>>>>>> template
            is IsMailAlreadyTakenQuery -> null
            is ListOrganismesQuery -> null
            is SearchDeliberationQuery -> Role.user
            is SearchRepresentantsQuery -> Role.user
        }
}
