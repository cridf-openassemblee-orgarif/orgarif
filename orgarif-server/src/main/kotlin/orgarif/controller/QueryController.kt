package orgarif.controller

import orgarif.query.IsMailAlreadyTakenQuery
import orgarif.query.IsMailAlreadyTakenQueryHandler
import orgarif.query.Query
import orgarif.query.QueryConfiguration
import orgarif.query.QueryHandler
import orgarif.query.QueryResponse
import orgarif.repository.user.UserDao
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.TransactionIsolationService
import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class QueryController(
    val userDao: UserDao,
    val userSessionService: UserSessionService,
    val isMailAlreadyTakenQueryHandler: IsMailAlreadyTakenQueryHandler,
    val transactionIsolationService: TransactionIsolationService,
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
            is IsMailAlreadyTakenQuery -> isMailAlreadyTakenQueryHandler
        }.let { @Suppress("UNCHECKED_CAST") (it as QueryHandler<Query, QueryResponse>) }
}
