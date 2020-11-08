package orgarif.service.organisme

import FullInstance
import FullOrganisme
import Representant
import RepresentantOrSuppleant
import org.springframework.stereotype.Service
import orgarif.domain.OrganismeId
import orgarif.repository.sql.*

@Service
class OrganismeService(val organismeDao: OrganismeDao,
                       val instanceDao: InstanceDao,
                       val deliberationAdvancedDao: DeliberationAdvancedDao,
                       val representantDao: RepresentantDao,
                       val deliberationDao: DeliberationDao) {

    fun fetchFullOrganisme(id: OrganismeId): FullOrganisme {
        val organisme = organismeDao.fetch(id)
        val deliberations = deliberationAdvancedDao.fetchDeliberationByOrganismeId(id)
                .groupBy { it.first.instanceId }
                .mapValues { it.value.map { it.second }.sortedBy { it.deliberationDate } }
        val representants = representantDao.fetchByOrganismeId(organisme.id)
                .groupBy { it.instanceId to it.representantOrSuppleant }
                .mapValues { it.value.sortedBy { it.position }.map { Representant(it.id, it.eluId) } }
        val instances = instanceDao.fetchByOrganismeId(organisme.id)
                .map {
                    FullInstance(it,
                            deliberations[it.id] ?: emptyList(),
                            representants[it.id to RepresentantOrSuppleant.representant] ?: emptyList(),
                            representants[it.id to RepresentantOrSuppleant.suppleant] ?: emptyList())
                }
        return FullOrganisme(organisme,
                deliberations[null] ?: emptyList(),
                representants[null to RepresentantOrSuppleant.representant] ?: emptyList(),
                representants[null to RepresentantOrSuppleant.suppleant] ?: emptyList(),
                instances)
    }

}