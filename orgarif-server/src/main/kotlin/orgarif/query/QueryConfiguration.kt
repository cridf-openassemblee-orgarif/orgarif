package orgarif.query

import orgarif.domain.Role
import orgarif.domain.Role.Admin
import orgarif.domain.Role.User

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
            is GetLastDeliberationsQuery -> User
            is GetOrganismeQuery -> null
            is GetRepresentantDetailsQuery -> Admin
            GetRepresentantsQuery -> Admin
            is GetUserInfosQuery -> Admin
            is GetUsersQuery -> Admin
            is IsMailAlreadyTakenQuery -> null
            is ListAllOrganismesQuery -> User
            is ListOrganismesQuery -> null
            is SearchDeliberationQuery -> User
            is SearchRepresentantsQuery -> User
        }
}
