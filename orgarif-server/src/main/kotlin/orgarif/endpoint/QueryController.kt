package orgarif.endpoint

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.domain.AuthenticationLevel
import orgarif.error.OrgarifSecurityException
import orgarif.query.*
import orgarif.query.mail.IsLoginAlreadyExistsQueryHandler
import orgarif.query.mail.ListOrganismesQueryHandler
import orgarif.repository.sql.UserDao
import orgarif.service.user.UserSessionHelper
import orgarif.utils.Serializer
import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest

@RestController
class QueryController(
        val isLoginAlreadyExistsQueryHandler: IsLoginAlreadyExistsQueryHandler,
        val listOrganismesQueryHandler: ListOrganismesQueryHandler,

        val userDao: UserDao) {

    @GetMapping("/query")
    fun handle(request: HttpServletRequest): QueryResponse {
        val jsonQuery = URLDecoder.decode(request.queryString, Charsets.UTF_8.name())
        val query = Serializer.deserialize<Query>(jsonQuery)
        val userSession = if (UserSessionHelper.isAuthenticated()) UserSessionHelper.getUserSession() else null
        val handler = handler(query)
        return when (QueryConfiguration.authenticationLevel(query)) {
            AuthenticationLevel.loggedOut -> {
                if (userSession != null) {
                    throw RuntimeException()
                }
                handler.doHandle(query, null)
            }
            AuthenticationLevel.neutral -> handler.doHandle(query, userSession)
            AuthenticationLevel.loggedIn -> {
                if (userSession == null) {
                    throw RuntimeException()
                }
                handler.doHandle(query, userSession)
            }
            AuthenticationLevel.admin -> {
                if (!UserSessionHelper.isAdmin()) {
                    throw OrgarifSecurityException("$userSession ${query.javaClass.simpleName}")
                }
                handler.doHandle(query, userSession)
            }
        }
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(query: Query): QueryHandlerInterface<Query, QueryResponse> = when (query) {
        is IsLoginAlreadyTakenQuery -> isLoginAlreadyExistsQueryHandler
        is ListOrganismesQuery -> listOrganismesQueryHandler
    } as QueryHandler<Query, QueryResponse>

}