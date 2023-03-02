package orgarif.query

import com.fasterxml.jackson.annotation.JsonTypeInfo

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Query

sealed class QueryResponse

data class IsMailAlreadyTakenQuery(val mail: String) : Query()

data class IsMailAlreadyTakenQueryResponse(val alreadyTaken: Boolean) : QueryResponse()
