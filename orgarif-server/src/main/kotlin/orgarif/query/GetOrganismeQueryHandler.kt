package orgarif.query

import org.springframework.stereotype.Service
import orgarif.service.organisme.OrganismeService

@Service
class GetOrganismeQueryHandler(val organismeService: OrganismeService) :
    QueryHandler.Handler<GetOrganismeQuery, GetOrganismeQueryResponse>() {

    override fun handle(query: GetOrganismeQuery) =
        GetOrganismeQueryResponse(organismeService.fetchFullOrganisme(query.id))

}
