package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo
import kt2ts.annotation.GenerateTypescript
import orgarif.domain.DeliberationDto
import orgarif.domain.DepartementId
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.OrganismeDto
import orgarif.domain.OrganismeId
import orgarif.domain.OrganismeListDto
import orgarif.domain.RepresentantDto
import orgarif.domain.RepresentantId
import orgarif.domain.SecteurId
import orgarif.domain.TypeStructureId
import orgarif.domain.UserId
import orgarif.domain.UserInfos

@GenerateTypescript
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

@GenerateTypescript sealed class QueryResponse

data object GetLastDeliberationsQuery : Query()

data class GetLastDeliberationsQueryResponse(val results: List<DeliberationDto>) : QueryResponse()

data class GetOrganismeQuery(val id: OrganismeId) : Query()

data class GetOrganismeQueryResponse(val organisme: OrganismeDto) : QueryResponse()

data class GetRepresentantDetailsQuery(val id: RepresentantId) : Query()

data class GetRepresentantDetailsQueryResponse(
    val representant: RepresentantDto,
    val organismes: List<OrganismeListDto>
) : QueryResponse()

data object GetRepresentantsQuery : Query()

data class GetRepresentantsQueryResponse(val representants: List<RepresentantDto>) :
    QueryResponse()

data class GetUserInfosQuery(val userId: UserId) : Query()

data class GetUserInfosQueryResponse(val userInfos: UserInfos?) : QueryResponse()

data object GetUsersQuery : Query()

data class GetUsersQueryResponse(val users: List<UserInfos>) : QueryResponse()

data class IsMailAlreadyTakenQuery(val mail: String) : Query()

data class IsMailAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()

data object ListAllOrganismesQuery : Query()

data class ListAllOrganismesQueryResponse(
    val organismes: List<OrganismeListDto>,
) : QueryResponse()

data class ListOrganismesQuery(
    val departementIds: List<DepartementId>,
    val natureJuridiqueIds: List<NatureJuridiqueId>,
    val secteurIds: List<SecteurId>,
    val typeStructureIds: List<TypeStructureId>,
    val searchLabel: String?,
    val itemsNumber: Int,
    val offset: Int,
) : Query()

data class ListOrganismesQueryResponse(
    val organismes: List<OrganismeListDto>,
    val totalNumber: Int
) : QueryResponse()

data class SearchDeliberationQuery(val searchToken: String) : Query()

data class SearchDeliberationQueryResponse(val results: List<DeliberationDto>) : QueryResponse()

data class SearchRepresentantsQuery(val searchToken: String) : Query()

data class SearchRepresentantsQueryResponse(val representants: List<RepresentantDto>) :
    QueryResponse()
