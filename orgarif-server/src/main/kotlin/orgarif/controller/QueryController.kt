package orgarif.controller

import jakarta.servlet.http.HttpServletRequest
import java.net.URLDecoder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.query.GetUserInfosQuery
import orgarif.query.GetUserInfosQueryHandler
import orgarif.query.GetUsersQuery
import orgarif.query.GetUsersQueryHandler
import orgarif.query.IsMailAlreadyTakenQuery
import orgarif.query.IsMailAlreadyTakenQueryHandler
import orgarif.query.Query
import orgarif.query.QueryConfiguration
import orgarif.query.QueryHandler
import orgarif.query.QueryResponse
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.TransactionIsolationService

@RestController
class QueryController(
    private val transactionIsolationService: TransactionIsolationService,
    private val userSessionService: UserSessionService,
    private val getUserInfosQueryHandler: GetUserInfosQueryHandler,
    private val getUsersQueryHandler: GetUsersQueryHandler,
    private val isMailAlreadyTakenQueryHandler: IsMailAlreadyTakenQueryHandler,
) {

    @GetMapping("/query")
    fun handle(request: HttpServletRequest): QueryResponse {
        val jsonQuery = URLDecoder.decode(request.queryString, Charsets.UTF_8.name())
        val query = Serializer.deserialize<Query>(jsonQuery)
        userSessionService.verifyRoleOrFail(
            QueryConfiguration.role(query), request.remoteAddr, query.javaClass)
        val handler = handler(query)
        val userSession =
            if (userSessionService.isAuthenticated()) userSessionService.getUserSession() else null
        return transactionIsolationService.executeReadOnly { handler.doHandle(query, userSession) }
    }

    private fun handler(query: Query) =
        when (query) {
            is GetUserInfosQuery -> getUserInfosQueryHandler
            is GetUsersQuery -> getUsersQueryHandler
            is IsMailAlreadyTakenQuery -> isMailAlreadyTakenQueryHandler
        }.let { @Suppress("UNCHECKED_CAST") (it as QueryHandler<Query, QueryResponse>) }
}
