package orgarif.query

import org.springframework.stereotype.Service
import orgarif.command.QueryHandler
import orgarif.repository.OrganismeDao

@Service
class ListOrganismesQueryHandler(val organismeDao: OrganismeDao) :
    QueryHandler.Handler<ListOrganismesQuery, ListOrganismesQueryResponse>() {

    override fun handle(query: ListOrganismesQuery) =
        ListOrganismesQueryResponse(organismeDao.fetchAll())

}
