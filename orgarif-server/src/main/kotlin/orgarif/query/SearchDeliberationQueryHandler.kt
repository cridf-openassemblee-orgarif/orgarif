package orgarif.query

import org.springframework.stereotype.Service
import orgarif.config.SharedConstants
import orgarif.domain.DeliberationDto
import orgarif.repository.DeliberationDao
import orgarif.utils.OrgarifStringUtils

@Service
class SearchDeliberationQueryHandler(val deliberationDao: DeliberationDao) :
    QueryHandler.Handler<SearchDeliberationQuery, SearchDeliberationQueryResponse>() {

    override fun handle(query: SearchDeliberationQuery): SearchDeliberationQueryResponse {
        if (query.searchToken.length < SharedConstants.searchLengthLimit) {
            throw IllegalArgumentException()
        }
        // TODO tester de ouf
        val tokens = OrgarifStringUtils.cleanForSearch(query.searchToken).split(" ")
        val results =
            tokens
                .flatMap {
                    deliberationDao.search(it).map {
                        DeliberationDto(it.id, it.libelle, it.deliberationDate)
                    }
                }
                .distinct()
        return SearchDeliberationQueryResponse(results)
    }
}
