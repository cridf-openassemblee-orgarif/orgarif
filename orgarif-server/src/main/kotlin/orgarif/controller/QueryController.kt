package orgarif.controller

import java.net.URLDecoder
import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.query.GetOrganismeQuery
import orgarif.query.GetOrganismeQueryHandler
import orgarif.query.IsMailAlreadyTakenQuery
import orgarif.query.IsMailAlreadyTakenQueryHandler
import orgarif.query.ListOrganismesBySecteurQuery
import orgarif.query.ListOrganismesBySecteurQueryHandler
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

@RestController
class QueryController(
    val userDao: UserDao,
    val userSessionService: UserSessionService,
    val getOrganismeQueryHandler: GetOrganismeQueryHandler,
    val isMailAlreadyTakenQueryHandler: IsMailAlreadyTakenQueryHandler,
    val listOrganismesBySecteurQueryHandler: ListOrganismesBySecteurQueryHandler,
    val listOrganismesQueryHandler: ListOrganismesQueryHandler,
    val searchDeliberationQueryHandler: SearchDeliberationQueryHandler,
    val searchRepresentantsQueryHandler: SearchRepresentantsQueryHandler,
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
            is GetOrganismeQuery -> getOrganismeQueryHandler
            is IsMailAlreadyTakenQuery -> isMailAlreadyTakenQueryHandler
            is ListOrganismesBySecteurQuery -> listOrganismesBySecteurQueryHandler
            is ListOrganismesQuery -> listOrganismesQueryHandler
            is SearchDeliberationQuery -> searchDeliberationQueryHandler
            is SearchRepresentantsQuery -> searchRepresentantsQueryHandler
        } as
            QueryHandler<Query, QueryResponse>
}
