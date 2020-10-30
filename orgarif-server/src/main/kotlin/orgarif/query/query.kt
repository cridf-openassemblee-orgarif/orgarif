package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.UserSession
import java.time.Instant

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

data class ExceptionQuery(val i: Instant) : Query()
class ExceptionQueryResponse : QueryResponse()
class RuntimeExceptionQuery : Query()
class RuntimeExceptionQueryResponse : QueryResponse()
