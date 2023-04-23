package orgarif.controller

import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.query.GetLastDeliberationsQuery
import orgarif.query.GetLastDeliberationsQueryHandler
import orgarif.query.GetOrganismeQuery
import orgarif.query.GetOrganismeQueryHandler
import orgarif.query.GetUserInfosQuery
import orgarif.query.GetUserInfosQueryHandler
import orgarif.query.GetUsersQuery
import orgarif.query.GetUsersQueryHandler
import orgarif.query.IsMailAlreadyTakenQuery
import orgarif.query.IsMailAlreadyTakenQueryHandler
import orgarif.query.ListAllOrganismesQuery
import orgarif.query.ListAllOrganismesQueryHandler
import orgarif.query.ListOrganismesQuery
import orgarif.query.ListOrganismesQueryHandler
import orgarif.query.Query
import orgarif.query.QueryConfiguration
import orgarif.query.QueryHandler
import orgarif.query.QueryResponse
import orgarif.query.SearchDeliberationQuery
import orgarif.query.SearchDeliberationQueryHandler
import orgarif.query.SearchRepresentantsQuery
import orgarif.query.SearchRepresentantsQueryHandler
import orgarif.repository.user.UserDao
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.TransactionIsolationService

@RestController
class QueryController(
    private val userDao: UserDao,
    private val userSessionService: UserSessionService,
    private val getLastDeliberationsQueryHandler: GetLastDeliberationsQueryHandler,
    private val getOrganismeQueryHandler: GetOrganismeQueryHandler,
    private val getUserInfosQueryHandler: GetUserInfosQueryHandler,
    private val getUsersQueryHandler: GetUsersQueryHandler,
    private val isMailAlreadyTakenQueryHandler: IsMailAlreadyTakenQueryHandler,
    private val listAllOrganismesQueryHandler: ListAllOrganismesQueryHandler,
    private val listOrganismesQueryHandler: ListOrganismesQueryHandler,
    private val searchDeliberationQueryHandler: SearchDeliberationQueryHandler,
    private val searchRepresentantsQueryHandler: SearchRepresentantsQueryHandler,
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
            is GetLastDeliberationsQuery -> getLastDeliberationsQueryHandler
            is GetOrganismeQuery -> getOrganismeQueryHandler
            is GetUserInfosQuery -> getUserInfosQueryHandler
            is GetUsersQuery -> getUsersQueryHandler
            is IsMailAlreadyTakenQuery -> isMailAlreadyTakenQueryHandler
            is ListAllOrganismesQuery -> listAllOrganismesQueryHandler
            is ListOrganismesQuery -> listOrganismesQueryHandler
            is SearchDeliberationQuery -> searchDeliberationQueryHandler
            is SearchRepresentantsQuery -> searchRepresentantsQueryHandler
        }.let { @Suppress("UNCHECKED_CAST") (it as QueryHandler<Query, QueryResponse>) }
}
