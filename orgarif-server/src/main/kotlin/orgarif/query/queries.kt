package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.DeliberationDto
import orgarif.domain.DepartementId
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.OrganismeDto
import orgarif.domain.OrganismeId
import orgarif.domain.OrganismeListDto
import orgarif.domain.RepresentantDto
import orgarif.domain.SecteurId
import orgarif.domain.TypeStructureId

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

sealed class QueryResponse

data class GetOrganismeQuery(val id: OrganismeId) : Query()

data class GetOrganismeQueryResponse(val organisme: OrganismeDto) : QueryResponse()

data class IsMailAlreadyTakenQuery(val mail: String) : Query()

data class IsMailAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()

data class ListOrganismesQuery(
    val departementIds: List<DepartementId>,
    val natureJuridiqueIds: List<NatureJuridiqueId>,
    val secteurIds: List<SecteurId>,
    val typeStructureIds: List<TypeStructureId>
) : Query()

data class ListOrganismesQueryResponse(val organismes: List<OrganismeListDto>) : QueryResponse()

data class SearchDeliberationQuery(val searchToken: String) : Query()

data class SearchDeliberationQueryResponse(val results: List<DeliberationDto>) : QueryResponse()

data class SearchRepresentantsQuery(val searchToken: String) : Query()

data class SearchRepresentantsQueryResponse(val representants: List<RepresentantDto>) :
    QueryResponse()
