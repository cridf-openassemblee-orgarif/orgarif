package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.*

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

sealed class QueryResponse

data class GetOrganismeQuery(val id: OrganismeId) : Query()

data class GetOrganismeQueryResponse(val organisme: OrganismeDto) : QueryResponse()

data class IsLoginAlreadyTakenQuery(val login: String) : Query()

data class IsLoginAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()

data class ListOrganismesBySecteurQuery(val secteurId: SecteurId) : Query()

data class ListOrganismesBySecteurQueryResponse(val organismes: List<OrganismeListDto>) :
    QueryResponse()

class ListOrganismesQuery : Query()

data class ListOrganismesQueryResponse(val organismes: List<OrganismeListDto>) : QueryResponse()

class ListRepresentantsQuery : Query()

data class ListRepresentantsQueryResponse(val representants: List<RepresentantDto>) :
    QueryResponse()

data class SearchDeliberationQuery(val searchToken: String) : Query()

data class SearchDeliberationQueryResponse(val results: List<DeliberationDto>) : QueryResponse()
