package orgarif.query

import orgarif.domain.UserSession

interface QueryHandler<Q : Query, R : QueryResponse> {
    fun doHandle(query: Q, userSession: UserSession?): R

    abstract class Handler<Q : Query, R : QueryResponse> : QueryHandler<Q, R> {
        override fun doHandle(query: Q, userSession: UserSession?): R = handle(query)

        abstract fun handle(query: Q): R
    }

    abstract class SessionHandler<Q : Query, R : QueryResponse> : QueryHandler<Q, R> {
        override fun doHandle(query: Q, userSession: UserSession?): R {
            if (userSession == null) {
                throw RuntimeException()
            }
            return handle(query, userSession)
        }

        abstract fun handle(query: Q, userSession: UserSession): R
    }
}
