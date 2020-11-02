package orgarif.query.mail

import org.springframework.stereotype.Service
import orgarif.query.*
import orgarif.repository.sql.OrganismeDao
import orgarif.service.organisme.OrganismeService

@Service
class GetOrganismeQueryHandler(val organismeService: OrganismeService) :
        QueryHandler<GetOrganismeQuery, GetOrganismeQueryResponse>() {

    override fun handle(query: GetOrganismeQuery) =
            GetOrganismeQueryResponse(organismeService.fetchFullOrganisme(query.id))

}
