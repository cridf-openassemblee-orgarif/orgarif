package orgarif.query

import Organisme
import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.UserSession

@JsonTypeInfo(use = JsonTypeInfo.Id.MINIMAL_CLASS, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

sealed class QueryResponse

interface QueryHandlerInterface<Q : Query, R : QueryResponse> {
    fun doHandle(query: Q, userSession: UserSession?): R
}

abstract class QueryHandler<Q : Query, R : QueryResponse> : QueryHandlerInterface<Q, R> {
    override fun doHandle(query: Q, userSession: UserSession?): R {
        return handle(query)
    }

    abstract fun handle(query: Q): R
}

abstract class LoggedInQueryHandler<Q : Query, R : QueryResponse> : QueryHandlerInterface<Q, R> {
    override fun doHandle(query: Q, userSession: UserSession?): R {
        if (userSession == null) {
            throw RuntimeException()
        }
        return handle(query, userSession)
    }

    abstract fun handle(query: Q, userSession: UserSession): R
}

data class IsLoginAlreadyTakenQuery(val login: String) : Query()

data class IsLoginAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()

class ListOrganismesQuery : Query()

data class ListOrganismesQueryResponse(val organismes: List<Organisme>) : QueryResponse()