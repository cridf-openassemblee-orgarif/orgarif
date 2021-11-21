package orgarif.controller

import orgarif.query.*
import orgarif.repository.UserDao
import orgarif.service.user.UserSessionService
import orgarif.serialization.Serializer
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest

@RestController
class QueryController(
    val userDao: UserDao,

    val userSessionService: UserSessionService,

    val isLoginAlreadyTakenQueryHandler: IsLoginAlreadyTakenQueryHandler
) {

    @GetMapping("/query")
    fun handle(request: HttpServletRequest): QueryResponse {
        val jsonQuery = URLDecoder.decode(request.queryString, Charsets.UTF_8.name())
        val query = Serializer.deserialize<Query>(jsonQuery)
        userSessionService.verifyRoleOrFail(QueryConfiguration.role(query), request.remoteAddr, query.javaClass)
        val handler = handler(query)
        val userSession = if (userSessionService.isAuthenticated()) userSessionService.getUserSession() else null
        return handler.doHandle(query, userSession)
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(query: Query) = when (query) {
        is IsLoginAlreadyTakenQuery -> isLoginAlreadyTakenQueryHandler
    } as QueryHandler<Query, QueryResponse>

}
