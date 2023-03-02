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
import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class QueryController(
    val userDao: UserDao,
    val userSessionService: UserSessionService,
    val isMailAlreadyTakenQueryHandler: IsMailAlreadyTakenQueryHandler
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
        return handler.doHandle(query, userSession)
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(query: Query) =
        when (query) {
            is IsMailAlreadyTakenQuery -> isMailAlreadyTakenQueryHandler
        }
            as QueryHandler<Query, QueryResponse>
}
