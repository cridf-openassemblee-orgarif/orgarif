package orgarif.query

import orgarif.domain.Role

object QueryConfiguration {

    fun role(query: Query): Role? =
        when (query) {
            is GetOrganismeQuery -> null
            is IsLoginAlreadyTakenQuery -> null
            is ListOrganismesBySecteurQuery -> null
            is ListOrganismesQuery -> null
            is ListRepresentantsQuery -> null
            is SearchDeliberationQuery -> Role.user
        }
}
