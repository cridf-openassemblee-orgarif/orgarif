package orgarif.service.organisme

import org.springframework.stereotype.Service
import orgarif.domain.*
import orgarif.repository.*

@Service
class OrganismeService(
    val organismeDao: OrganismeDao,
    val instanceDao: InstanceDao,
    val deliberationAdvancedDao: DeliberationAdvancedDao,
    val representationDao: RepresentationDao,
    val suppleanceDao: SuppleanceDao,
    val representantDao: RepresentantDao,
    val eluDao: EluDao
) {

    fun fetchOrganismeDto(id: OrganismeId): OrganismeDto {
        val organisme = organismeDao.fetch(id)
        val lienDeliberations =
            deliberationAdvancedDao
                .fetchDeliberationByOrganismeId(id)
                .groupBy { it.first.instanceId }
                .mapValues {
                    it.value.sortedBy { it.second.deliberationDate }.map {
                        LienDeliberationDto(
                            it.first.id,
                            DeliberationDto(
                                it.second.id, it.second.libelle, it.second.deliberationDate))
                    }
                }
        val representationsByInstance = let {
            val representations = representationDao.fetchByOrganismeId(organisme.id)
            val suppleances = suppleanceDao.fetchByOrganismeId(organisme.id)
            val representantById = let {
                val ids =
                    representations.map { it.representantId } +
                        suppleances.map { it.representantId }
                val representants = representantDao.fetch(ids.toSet()).let { representantDtos(it) }
                representants.associateBy { it.id }
            }
            val suppleanceByRepresentation = suppleances.associateBy { it.representationId }
            representations.groupBy { it.instanceId }.mapValues {
                it.value.sortedBy { it.position }.map {
                    RepresentationDto(
                        it.id,
                        representantById.getValue(it.representantId),
                        it.startDate,
                        it.endDate,
                        suppleanceByRepresentation[it.id]?.let {
                            SuppleanceDto(
                                it.id,
                                representantById.getValue(it.representantId),
                                it.startDate,
                                it.endDate)
                        })
                }
            }
        }
        val instances =
            instanceDao.fetchByOrganismeId(organisme.id).map {
                InstanceDto(
                    it.id,
                    it.nom,
                    it.nombreRepresentants,
                    lienDeliberations[it.id] ?: emptyList(),
                    representationsByInstance[it.id] ?: emptyList(),
                    it.status)
            }
        return OrganismeDto(
            organisme.id,
            organisme.nom,
            organisme.secteurId,
            organisme.natureJuridiqueId,
            organisme.typeStructureId,
            organisme.nombreRepresentants,
            representationsByInstance[null] ?: emptyList(),
            lienDeliberations[null] ?: emptyList(),
            instances,
            organisme.status)
    }

    fun representantDtos(representants: List<RepresentantDao.Record>): List<RepresentantDto> {
        val elus =
            representants.mapNotNull { it.eluId }.let { eluDao.fetch(it.toSet()) }.associateBy {
                it.id
            }
        return representants.map {
            val elu = it.eluId?.let { elus.getValue(it) }
            RepresentantDto(
                it.id,
                elu != null,
                elu?.civilite?.name,
                elu?.prenom ?: it.prenom ?: throw IllegalStateException("${it.id}"),
                elu?.nom ?: it.nom ?: throw IllegalStateException("${it.id}"),
                elu?.groupePolitique,
                elu?.groupePolitiqueCourt,
                elu?.imageUrl,
                elu?.actif)
        }
    }
}
