package orgarif.query

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao

@Service
class ListOrganismesQueryHandler(val organismeDao: OrganismeDao) :
    QueryHandler<ListOrganismesQuery, ListOrganismesQueryResponse>() {

    override fun handle(query: ListOrganismesQuery) =
        ListOrganismesQueryResponse(organismeDao.fetchAll())

}
