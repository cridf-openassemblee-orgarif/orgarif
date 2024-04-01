package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeListDto
import orgarif.domain.RepresentantDto
import orgarif.repository.DesignationDao
import orgarif.repository.EluDao
import orgarif.repository.OrganismeDao
import orgarif.repository.RepresentantDao

@Service
class GetRepresentantDetailsQueryHandler(
    val representantDao: RepresentantDao,
    val eluDao: EluDao,
    val designationDao: DesignationDao,
    val organismeDao: OrganismeDao
) : QueryHandler.Handler<GetRepresentantDetailsQuery, GetRepresentantDetailsQueryResponse>() {

    override fun handle(query: GetRepresentantDetailsQuery): GetRepresentantDetailsQueryResponse {
        val r =
            representantDao.fetch(query.id)
                ?: throw IllegalArgumentException("Representant not found ${query.id}")
        val elu = r.eluId?.let { eluDao.fetch(it) }
        val designations = designationDao.fetchByRepresentantIdAndStatus(r.id, ItemStatus.live)
        val organismes = organismeDao.fetch(designations.map { it.organismeId }.toSet())
        return GetRepresentantDetailsQueryResponse(
            RepresentantDto.from(r, elu), organismes.map { OrganismeListDto.from(it) })
    }
}
