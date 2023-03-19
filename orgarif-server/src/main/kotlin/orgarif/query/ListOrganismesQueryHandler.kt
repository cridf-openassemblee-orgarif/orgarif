package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeListDto
import orgarif.repository.OrganismeDao

@Service
class ListOrganismesQueryHandler(val organismeDao: OrganismeDao) :
    QueryHandler.Handler<ListOrganismesQuery, ListOrganismesQueryResponse>() {

    override fun handle(query: ListOrganismesQuery): ListOrganismesQueryResponse {
        val dtos =
            organismeDao
                .fetchByCategories(
                    ItemStatus.live,
                    query.departementIds,
                    query.natureJuridiqueIds,
                    query.secteurIds,
                    query.typeStructureIds,query.itemsNumber)
                .map { OrganismeListDto(it) }
        val itemsNumber =
            organismeDao.count(
                ItemStatus.live,
                query.departementIds,
                query.natureJuridiqueIds,
                query.secteurIds,
                query.typeStructureIds)
        return ListOrganismesQueryResponse(dtos, itemsNumber)
    }
}
