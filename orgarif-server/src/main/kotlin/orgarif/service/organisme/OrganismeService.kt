package orgarif.service.organisme

import FullInstance
import FullOrganisme
import org.springframework.stereotype.Service
import orgarif.repository.sql.*

@Service
class OrganismeService(val organismeDao: OrganismeDao,
                       val instanceDao: InstanceDao,
                       val representantOrganismeDao: RepresentantOrganismeDao,
                       val representantInstanceDao: RepresentantInstanceDao,
                       val deliberationDao: DeliberationDao,
                       val organismeDeliberationDao: OrganismeDeliberationDao,
                       val instanceDeliberationDao: InstanceDeliberationDao) {

    fun fetchFullOrganisme(organisme: OrganismeDao.Record) {
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
                    FullInstance(it, deliberations, representants.getValue(false), representants.getValue(true))
                }
        FullOrganisme(organisme,
                deliberations,
                representants.getValue(false),
                representants.getValue(true),
                instances)
    }

}