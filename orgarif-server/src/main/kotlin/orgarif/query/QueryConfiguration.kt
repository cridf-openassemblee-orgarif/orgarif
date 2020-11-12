package orgarif.query

import orgarif.domain.AuthenticationLevel

object QueryConfiguration {

    fun authenticationLevel(query: Query) = when (query) {
        is GetOrganismeQuery -> AuthenticationLevel.neutral
        is IsLoginAlreadyTakenQuery -> AuthenticationLevel.neutral
        is ListOrganismesQuery -> AuthenticationLevel.neutral
        is SearchDeliberationQuery -> AuthenticationLevel.neutral
    }

}