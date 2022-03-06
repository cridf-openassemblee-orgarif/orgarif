package orgarif.query

import org.springframework.stereotype.Service
import orgarif.config.SharedConstants
import orgarif.repository.RepresentantDao
import orgarif.service.organisme.OrganismeService
import orgarif.utils.OrgarifStringUtils

@Service
class SearchRepresentantsQueryHandler(
    val representantDao: RepresentantDao,
    val organismeService: OrganismeService
) : QueryHandler.Handler<SearchRepresentantsQuery, SearchRepresentantsQueryResponse>() {

    override fun handle(query: SearchRepresentantsQuery): SearchRepresentantsQueryResponse {
        if (query.searchToken.length < SharedConstants.searchLengthLimit) {
            throw IllegalArgumentException()
        }
        // TODO tester de ouf
        // pas distinct mais intersect ?
        val tokens = OrgarifStringUtils.cleanForSearch(query.searchToken).split(" ")
        val results = tokens.flatMap { representantDao.search(it) }.distinct()
        return SearchRepresentantsQueryResponse(organismeService.representantDtos(results))
    }
}
