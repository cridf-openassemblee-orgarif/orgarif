package orgarif.endpoint

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.command.QueryHandler
import orgarif.domain.AuthenticationLevel
import orgarif.error.OrgarifSecurityException
import orgarif.query.*
import orgarif.repository.UserDao
import orgarif.service.user.UserSessionHelper
import orgarif.utils.Serializer
import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest

@RestController
class QueryEndpoint(
    val getOrganismeQueryHandler: GetOrganismeQueryHandler,
    val isLoginAlreadyTakenQueryHandler: IsLoginAlreadyTakenQueryHandler,
    val listOrganismesBySecteurQueryHandler: ListOrganismesBySecteurQueryHandler,
    val listOrganismesQueryHandler: ListOrganismesQueryHandler,
    val searchDeliberationQueryHandler: SearchDeliberationQueryHandler,

    val userDao: UserDao
) {

    @GetMapping("/query")
    fun handle(request: HttpServletRequest): QueryResponse {
        val jsonQuery = URLDecoder.decode(request.queryString, Charsets.UTF_8.name())
        val query = Serializer.deserialize<Query>(jsonQuery)
        val userSession = if (UserSessionHelper.isAuthenticated()) UserSessionHelper.getUserSession() else null
        val handler = handler(query)
        return when (QueryConfiguration.authenticationLevel(query)) {
            AuthenticationLevel.anonymous -> handler.doHandle(query, userSession)
            AuthenticationLevel.loggedIn -> {
                if (userSession == null) {
                    throw RuntimeException()
                }
                handler.doHandle(query, userSession)
            }
            AuthenticationLevel.admin -> {
                // FIXMENOW ici should use UserSessionHelper mais tire question du userDao
                // set virer dépendance à UserDao
//                if (!UserSessionHelper.isAdmin()) {
//                    throw OrgarifSecurityException("$userSession ${query.javaClass.simpleName}")
//                }
                if (!UserSessionHelper.isAuthenticated()) {
                    throw OrgarifSecurityException("$userSession ${query.javaClass.simpleName}")
                }
                let {
                    val user = UserSessionHelper.getUserSession().userId.let {
                        userDao.fetch(it)
                            ?: throw IllegalArgumentException("$it")
                    }
                    if (!user.admin) {
                        throw OrgarifSecurityException("$userSession ${query.javaClass.simpleName}")
                    }
                }
                handler.doHandle(query, userSession)
            }
        }
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(query: Query) = when (query) {
        is GetOrganismeQuery -> getOrganismeQueryHandler
        is IsLoginAlreadyTakenQuery -> isLoginAlreadyTakenQueryHandler
        is ListOrganismesBySecteurQuery -> listOrganismesBySecteurQueryHandler
        is ListOrganismesQuery -> listOrganismesQueryHandler
        is SearchDeliberationQuery -> searchDeliberationQueryHandler
    } as QueryHandler<Query, QueryResponse>

}
