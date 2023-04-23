package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeListDto
import orgarif.repository.OrganismeDao

@Service
class ListAllOrganismesQueryHandler(val organismeDao: OrganismeDao) :
    QueryHandler.Handler<ListAllOrganismesQuery, ListAllOrganismesQueryResponse>() {

    override fun handle(query: ListAllOrganismesQuery) =
        ListAllOrganismesQueryResponse(
            organismeDao.fetchAll(ItemStatus.live).map { OrganismeListDto(it) })
}
