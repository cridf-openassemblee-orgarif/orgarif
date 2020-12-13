package orgarif.query

import org.springframework.stereotype.Service
import orgarif.query.ListOrganismesQuery
import orgarif.query.ListOrganismesQueryResponse
import orgarif.query.QueryHandler
import orgarif.repository.sql.OrganismeDao

@Service
class ListOrganismesBySecteurQueryHandler(val organismeDao: OrganismeDao) :
        QueryHandler<ListOrganismesBySecteurQuery, ListOrganismesBySecteurQueryResponse>() {

    override fun handle(query: ListOrganismesBySecteurQuery) =
            ListOrganismesBySecteurQueryResponse(organismeDao.fetchBySecteurId(query.secteurId))

}
