package orgarif.controller

import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.query.*
import orgarif.repository.user.UserDao
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.TransactionIsolationService

@RestController
class QueryController(
    private val userDao: UserDao,
    private val userSessionService: UserSessionService,
    private val getUserInfosQueryHandler: GetUserInfosQueryHandler,
    private val getUsersListQueryHandler: GetUsersListQueryHandler,
    private val isMailAlreadyTakenQueryHandler: IsMailAlreadyTakenQueryHandler,
    private val transactionIsolationService: TransactionIsolationService,
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
            is GetUsersListQuery -> getUsersListQueryHandler
            is IsMailAlreadyTakenQuery -> isMailAlreadyTakenQueryHandler
        }.let { @Suppress("UNCHECKED_CAST") (it as QueryHandler<Query, QueryResponse>) }
}
