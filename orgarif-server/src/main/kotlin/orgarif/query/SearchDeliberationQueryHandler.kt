package orgarif.query

import DeliberationInfos
import org.springframework.stereotype.Service
import orgarif.config.SharedConstants
import orgarif.repository.sql.DeliberationDao

@Service
class SearchDeliberationQueryHandler(val deliberationDao: DeliberationDao) :
        QueryHandler<SearchDeliberationQuery, SearchDeliberationQueryResponse>() {

    override fun handle(query: SearchDeliberationQuery): SearchDeliberationQueryResponse {
        if (query.searchToken.length < SharedConstants.deliberationSearchLengthLimit) {
            throw IllegalArgumentException()
        }
        val results = deliberationDao.search(query.searchToken)
                .map { DeliberationInfos(it.id, it.libelle, it.deliberationDate) }
        return SearchDeliberationQueryResponse(results)
    }

}
