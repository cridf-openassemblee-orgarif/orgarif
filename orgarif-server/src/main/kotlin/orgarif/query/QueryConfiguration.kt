package orgarif.query

import orgarif.domain.Role

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
            is GetOrganismeQuery -> null
            is IsMailAlreadyTakenQuery -> null
            is ListOrganismesQuery -> null
            is SearchDeliberationQuery -> Role.user
            is SearchRepresentantsQuery -> Role.user
        }
}
