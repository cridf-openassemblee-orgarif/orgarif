package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.DeliberationDto
import orgarif.repository.DeliberationDao

@Service
class GetLastDeliberationsQueryHandler(val deliberationDao: DeliberationDao) :
    QueryHandler.Handler<GetLastDeliberationsQuery, GetLastDeliberationsQueryResponse>() {

    override fun handle(query: GetLastDeliberationsQuery): GetLastDeliberationsQueryResponse =
        deliberationDao
            .fetchLast()
            .map { DeliberationDto(it.id, it.libelle, it.deliberationDate) }
            .let { GetLastDeliberationsQueryResponse(it) }
}
