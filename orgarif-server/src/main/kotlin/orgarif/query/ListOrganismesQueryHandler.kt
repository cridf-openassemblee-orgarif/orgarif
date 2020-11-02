package orgarif.query.mail

import org.springframework.stereotype.Service
import orgarif.query.ListOrganismesQuery
import orgarif.query.ListOrganismesQueryResponse
import orgarif.query.QueryHandler
import orgarif.repository.sql.OrganismeDao

@Service
class ListOrganismesQueryHandler(val organismeDao: OrganismeDao) :
        QueryHandler<ListOrganismesQuery, ListOrganismesQueryResponse>() {

    override fun handle(query: ListOrganismesQuery) =
            ListOrganismesQueryResponse(organismeDao.fetchAll())

}
