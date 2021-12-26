package orgarif.query

import org.springframework.stereotype.Service
import orgarif.config.SharedConstants
import orgarif.domain.DeliberationDto
import orgarif.repository.DeliberationDao

@Service
class SearchDeliberationQueryHandler(val deliberationDao: DeliberationDao) :
    QueryHandler.Handler<SearchDeliberationQuery, SearchDeliberationQueryResponse>() {

    override fun handle(query: SearchDeliberationQuery): SearchDeliberationQueryResponse {
        if (query.searchToken.length < SharedConstants.deliberationSearchLengthLimit) {
            throw IllegalArgumentException()
        }
        val results =
            deliberationDao.search(query.searchToken).map {
                DeliberationDto(it.id, it.libelle, it.deliberationDate)
            }
        return SearchDeliberationQueryResponse(results)
    }
}
