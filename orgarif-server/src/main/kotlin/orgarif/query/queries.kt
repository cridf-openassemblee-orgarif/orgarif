package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

sealed class QueryResponse

data class IsLoginAlreadyTakenQuery(val login: String) : Query()

data class IsLoginAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()
