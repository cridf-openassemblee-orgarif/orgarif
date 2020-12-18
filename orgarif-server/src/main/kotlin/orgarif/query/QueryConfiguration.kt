package orgarif.query

import orgarif.domain.AuthenticationLevel

object QueryConfiguration {

    fun authenticationLevel(query: Query) = when (query) {
        is GetOrganismeQuery -> AuthenticationLevel.admin
        is IsLoginAlreadyTakenQuery -> AuthenticationLevel.neutral
        is ListOrganismesBySecteurQuery -> AuthenticationLevel.admin
        is ListOrganismesQuery -> AuthenticationLevel.admin
        is SearchDeliberationQuery -> AuthenticationLevel.admin
    }

}