import orgarif.domain.EluId
import orgarif.domain.RepresentantId
import orgarif.repository.sql.DeliberationDao
import orgarif.repository.sql.InstanceDao
import orgarif.repository.sql.OrganismeDao

enum class RepresentantOrSuppleant { representant, suppleant }

typealias OrganismeInfos = OrganismeDao.Record

typealias InstanceInfos = InstanceDao.Record

data class Representant(val id: RepresentantId,
                        val eluId: EluId)

typealias DeliberationInfos = DeliberationDao.Record

data class FullInstance(val infos: InstanceInfos,
                        val deliberations: List<DeliberationInfos>,
                        val representants: List<Representant>,
                        val suppleants: List<Representant>)

data class FullOrganisme(val infos: OrganismeInfos,
                         val deliberations: List<DeliberationInfos>,
                         val representants: List<Representant>,
                         val suppleants: List<Representant>,
                         val instances: List<FullInstance>)
