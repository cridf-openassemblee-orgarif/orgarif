package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.RepresentantDto
import orgarif.repository.EluDao
import orgarif.repository.RepresentantDao

@Service
class GetRepresentantsQueryHandler(val representantDao: RepresentantDao, val eluDao: EluDao) :
    QueryHandler.Handler<GetRepresentantsQuery, GetRepresentantsQueryResponse>() {

    override fun handle(query: GetRepresentantsQuery): GetRepresentantsQueryResponse {
        val representants = representantDao.fetchAll()
        val elus =
            representants
                .mapNotNull { it.eluId }
                .let { eluDao.fetch(it.toSet()) }
                .associateBy { it.id }
        return GetRepresentantsQueryResponse(
            representants
                .sortedBy { it.nom }
                .map { it to elus[it.eluId] }
                .filter {
                    // si le représentant est élu, il doit être actif
                    val elu = it.second
                    elu == null || elu.actif
                }
                .map { RepresentantDto.from(it.first, it.second) })
    }
}
