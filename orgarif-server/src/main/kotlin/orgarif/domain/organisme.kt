import orgarif.domain.EluId
import orgarif.domain.RepresentantInstanceId
import orgarif.domain.RepresentantOrganismeId
import orgarif.repository.sql.*

typealias OrganismeInfos = OrganismeDao.Record

typealias InstanceInfos = InstanceDao.Record

data class RepresentantOrganisme  (val id: RepresentantOrganismeId,
                                   val eluId: EluId)

data class RepresentantInstance  (val id: RepresentantInstanceId,
                                  val eluId: EluId)

typealias DeliberationInfos = DeliberationDao.Record

data class FullInstance(val infos: InstanceInfos,
                        val deliberations: List<DeliberationInfos>,
                        val representants: List<RepresentantInstance>,
                        val suppleants: List<RepresentantInstance>)

data class FullOrganisme(val infos: OrganismeInfos,
                         val deliberations: List<DeliberationInfos>,
                         val representants: List<RepresentantOrganisme>,
                         val suppleants: List<RepresentantOrganisme>,
                         val instances: List<FullInstance>)
