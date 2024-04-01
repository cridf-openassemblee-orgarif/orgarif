package orgarif.service.organisme

import org.springframework.stereotype.Service
import orgarif.domain.DeliberationDto
import orgarif.domain.DesignationDto
import orgarif.domain.DesignationType
import orgarif.domain.InstanceDto
import orgarif.domain.ItemStatus
import orgarif.domain.LienDeliberationDto
import orgarif.domain.OrganismeDto
import orgarif.domain.OrganismeId
import orgarif.domain.RepresentantDto
import orgarif.repository.DeliberationAdvancedDao
import orgarif.repository.DesignationDao
import orgarif.repository.EluDao
import orgarif.repository.InstanceDao
import orgarif.repository.OrganismeDao
import orgarif.repository.RepresentantDao

@Service
class OrganismeService(
    val organismeDao: OrganismeDao,
    val instanceDao: InstanceDao,
    val deliberationAdvancedDao: DeliberationAdvancedDao,
    val designationDao: DesignationDao,
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
                    it.value
                        .sortedByDescending { it.second.deliberationDate }
                        .map {
                            LienDeliberationDto(
                                it.first.id,
                                DeliberationDto(
                                    it.second.id, it.second.libelle, it.second.deliberationDate),
                                it.first.comment)
                        }
                }
        val designationsMap = let {
            val designations =
                designationDao.fetchByOrganismeIdEndDateAndStatus(
                    organisme.id, null, ItemStatus.live)
            val representantById =
                representantDao
                    .fetch(designations.map { it.representantId }.toSet())
                    .let { representantDtos(it) }
                    .associateBy { it.id }
            designations
                .groupBy { it.type to it.instanceId }
                .mapValues {
                    it.value.associate {
                        it.position to
                            DesignationDto(
                                it.id,
                                representantById.getValue(it.representantId),
                                it.startDate,
                                it.endDate)
                    }
                }
        }
        val instances =
            instanceDao.fetchByOrganismeId(organisme.id).map {
                InstanceDto(
                    it.id,
                    it.nom,
                    it.nombreRepresentants,
                    it.presenceSuppleants,
                    listWithNulls(designationsMap[DesignationType.representant to it.id]),
                    listWithNulls(designationsMap[DesignationType.suppleant to it.id]),
                    lienDeliberations[it.id] ?: emptyList(),
                    it.status)
            }
        return OrganismeDto(
            organisme.id,
            organisme.nom,
            organisme.departementId,
            organisme.natureJuridiqueId,
            organisme.secteurId,
            organisme.typeStructureId,
            organisme.nombreRepresentants,
            organisme.presenceSuppleants,
            listWithNulls(designationsMap[DesignationType.representant to null]),
            listWithNulls(designationsMap[DesignationType.suppleant to null]),
            lienDeliberations[null] ?: emptyList(),
            instances,
            organisme.status)
    }

    fun listWithNulls(designations: Map<Int, DesignationDto>?): List<DesignationDto?> {
        val maxIndex = designations?.keys?.maxOrNull() ?: return emptyList()
        return (0..maxIndex).map { designations[it] }
    }

    fun representantDtos(representants: List<RepresentantDao.Record>): List<RepresentantDto> {
        val elus =
            representants
                .mapNotNull { it.eluId }
                .let { eluDao.fetch(it.toSet()) }
                .associateBy { it.id }
        return representants.map {
            val elu = it.eluId?.let { elus.getValue(it) }
            RepresentantDto.from(it, elu)
        }
    }
}
