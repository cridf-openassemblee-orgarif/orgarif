package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.UserId
import orgarif.domain.UserInfos
import kttots.Shared

@Shared
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

@Shared sealed class QueryResponse

data class GetUserInfosQuery(val userId: UserId) : Query()

data class GetUserInfosQueryResponse(val userInfos: UserInfos?) : QueryResponse()

class GetUsersListQuery : Query()

data class GetUsersListQueryResponse(val users: List<UserInfos>) : QueryResponse()

data class IsMailAlreadyTakenQuery(val mail: String) : Query()

data class IsMailAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()
