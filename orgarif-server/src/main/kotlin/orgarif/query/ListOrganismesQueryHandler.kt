package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.OrganismeListDto
import orgarif.repository.OrganismeDao

@Service
class ListOrganismesQueryHandler(val organismeDao: OrganismeDao) :
    QueryHandler.Handler<ListOrganismesQuery, ListOrganismesQueryResponse>() {

    override fun handle(query: ListOrganismesQuery) =
        ListOrganismesQueryResponse(organismeDao.fetchAll().map { OrganismeListDto(it) })

}
