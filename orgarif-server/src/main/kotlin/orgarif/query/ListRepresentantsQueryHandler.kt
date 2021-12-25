package orgarif.query

import org.springframework.stereotype.Service
import orgarif.repository.RepresentantDao
import orgarif.service.organisme.OrganismeService

@Service
class ListRepresentantsQueryHandler(val representantDao: RepresentantDao, val organismeService: OrganismeService) :
    QueryHandler.Handler<ListRepresentantsQuery, ListRepresentantsQueryResponse>() {

    override fun handle(query: ListRepresentantsQuery) =
        ListRepresentantsQueryResponse(representantDao.fetchAll().let { organismeService.representantDtos(it) })

}
