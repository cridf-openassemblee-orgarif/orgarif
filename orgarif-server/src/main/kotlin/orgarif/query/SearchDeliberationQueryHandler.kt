package orgarif.query.mail

import DeliberationInfos
import org.springframework.stereotype.Service
import orgarif.query.QueryHandler
import orgarif.query.SearchDeliberationQuery
import orgarif.query.SearchDeliberationQueryResponse
import orgarif.repository.sql.DeliberationDao
import java.lang.Thread.sleep

@Service
class SearchDeliberationQueryHandler(val deliberationDao: DeliberationDao) :
        QueryHandler<SearchDeliberationQuery, SearchDeliberationQueryResponse>() {

    override fun handle(query: SearchDeliberationQuery): SearchDeliberationQueryResponse {
        val results = deliberationDao.search(query.searchToken)
                .map { DeliberationInfos(it.id, it.libelle, it.deliberationDate) }
        return SearchDeliberationQueryResponse(results)
    }

}
