package orgarif.service.organisme

import FullInstance
import FullOrganisme
import org.springframework.stereotype.Service
import orgarif.domain.OrganismeId
import orgarif.repository.sql.*

@Service
class OrganismeService(val organismeDao: OrganismeDao,
                       val instanceDao: InstanceDao,
                       val representantOrganismeDao: RepresentantOrganismeDao,
                       val representantInstanceDao: RepresentantInstanceDao,
                       val deliberationDao: DeliberationDao,
                       val organismeDeliberationDao: OrganismeDeliberationDao,
                       val instanceDeliberationDao: InstanceDeliberationDao) {

    fun fetchFullOrganisme(id: OrganismeId): FullOrganisme {
        val organisme = organismeDao.fetch(id)
        val deliberations = organismeDeliberationDao.fetchByOrganismeId(organisme.id)
                .map { deliberationDao.fetch(it.deliberationId) }
                .sortedBy { it.deliberationDate }
        val representants = representantOrganismeDao.fetchByOrganismeId(organisme.id)
                .groupBy { it.isSuppleant }
                .mapValues { it.value.sortedBy { it.position } }
        val instances = instanceDao.fetchByOrganismeId(organisme.id)
                .map {
                    val deliberations = instanceDeliberationDao.fetchByInstanceId(it.id)
                            .map { deliberationDao.fetch(it.deliberationId) }
                            .sortedBy { it.deliberationDate }
                    val representants = representantInstanceDao.fetchByInstanceId(it.id)
                            .groupBy { it.isSuppleant }
                            .mapValues { it.value.sortedBy { it.position } }
                    FullInstance(it,
                            deliberations,
                            representants[false] ?: emptyList(),
                            representants[true] ?: emptyList())
                }
        return FullOrganisme(organisme,
                deliberations,
                representants[false] ?: emptyList(),
                representants[true] ?: emptyList(),
                instances)
    }

}