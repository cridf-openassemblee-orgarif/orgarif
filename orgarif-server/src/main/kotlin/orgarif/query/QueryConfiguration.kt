package orgarif.query

import orgarif.domain.AuthenticationLevel

object QueryConfiguration {

    fun authenticationLevel(query: Query) = when (query) {
        is IsLoginAlreadyTakenQuery -> AuthenticationLevel.anonymous
    }

}