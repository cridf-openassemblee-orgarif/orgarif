package orgarif.query

import DeliberationInfos
import FullOrganisme
import OrganismeInfos
import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.OrganismeId
import orgarif.domain.SecteurId
import orgarif.domain.UserSession

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
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

data class GetOrganismeQuery(val id: OrganismeId) : Query()

data class GetOrganismeQueryResponse(val organisme: FullOrganisme) : QueryResponse()

data class IsLoginAlreadyTakenQuery(val login: String) : Query()

data class IsLoginAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()

class ListOrganismesQuery : Query()

data class ListOrganismesBySecteurQuery(val secteurId: SecteurId) : Query()

data class ListOrganismesBySecteurQueryResponse(val organismes: List<OrganismeInfos>) : QueryResponse()

data class ListOrganismesQueryResponse(val organismes: List<OrganismeInfos>) : QueryResponse()

data class SearchDeliberationQuery(val searchToken: String) : Query()

data class SearchDeliberationQueryResponse(val results: List<DeliberationInfos>) : QueryResponse()