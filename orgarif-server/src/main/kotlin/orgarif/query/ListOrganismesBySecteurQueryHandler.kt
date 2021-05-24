package orgarif.query

import org.springframework.stereotype.Service
import orgarif.command.QueryHandler
import orgarif.repository.OrganismeDao

@Service
class ListOrganismesBySecteurQueryHandler(val organismeDao: OrganismeDao) :
    QueryHandler.Handler<ListOrganismesBySecteurQuery, ListOrganismesBySecteurQueryResponse>() {

    override fun handle(query: ListOrganismesBySecteurQuery) =
        ListOrganismesBySecteurQueryResponse(organismeDao.fetchBySecteurId(query.secteurId))

}
