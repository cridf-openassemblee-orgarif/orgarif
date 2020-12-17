package orgarif.query

import orgarif.domain.AuthenticationLevel

object QueryConfiguration {

    fun authenticationLevel(query: Query) = when (query) {
        is GetOrganismeQuery -> AuthenticationLevel.loggedIn
        is IsLoginAlreadyTakenQuery -> AuthenticationLevel.neutral
        is ListOrganismesBySecteurQuery -> AuthenticationLevel.loggedIn
        is ListOrganismesQuery -> AuthenticationLevel.loggedIn
        is SearchDeliberationQuery -> AuthenticationLevel.loggedIn
    }

}