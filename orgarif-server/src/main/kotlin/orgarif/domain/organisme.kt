import orgarif.repository.sql.*

typealias OrganismeInfos = OrganismeDao.Record

typealias InstanceInfos = InstanceDao.Record

typealias RepresentantOrganismeInfos = RepresentantOrganismeDao.Record

typealias RepresentantInstanceInfos = RepresentantInstanceDao.Record

typealias DeliberationInfos = DeliberationDao.Record

data class FullInstance(val infos: InstanceInfos,
                        val deliberations: List<DeliberationInfos>,
                        val representants: List<RepresentantInstanceInfos>,
                        val suppleants: List<RepresentantInstanceInfos>)

data class FullOrganisme(val infos: OrganismeInfos,
                         val deliberations: List<DeliberationInfos>,
                         val representants: List<RepresentantOrganismeInfos>,
                         val suppleants: List<RepresentantOrganismeInfos>,
                         val instances: List<FullInstance>)
