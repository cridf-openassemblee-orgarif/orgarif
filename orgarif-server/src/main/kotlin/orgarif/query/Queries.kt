package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo
import kt2ts.annotation.GenerateTypescript
import orgarif.domain.UserId
import orgarif.domain.UserInfos

@GenerateTypescript
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

@GenerateTypescript sealed class QueryResponse

data class GetUserInfosQuery(val userId: UserId) : Query()

data class GetUserInfosQueryResponse(val userInfos: UserInfos?) : QueryResponse()

data object GetUsersQuery : Query()

data class GetUsersQueryResponse(val users: List<UserInfos>) : QueryResponse()

data class IsMailAlreadyTakenQuery(val mail: String) : Query()

data class IsMailAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()
