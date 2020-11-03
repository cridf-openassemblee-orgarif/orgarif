import orgarif.domain.EluId
import orgarif.domain.RepresentantId
import orgarif.repository.sql.*
import java.time.Instant

typealias OrganismeInfos = OrganismeDao.Record

typealias InstanceInfos = InstanceDao.Record

data class RepresentantInfos(val id: RepresentantId,
                             val eluId: EluId) {

    companion object {
        fun from(r: RepresentantOrganismeDao.Record) = RepresentantInfos(r.id, r.eluId)

        fun from(r: RepresentantInstanceDao.Record) = RepresentantInfos(r.id, r.eluId)
    }
}

typealias DeliberationInfos = DeliberationDao.Record

data class FullInstance(val infos: InstanceInfos,
                        val deliberations: List<DeliberationInfos>,
                        val representants: List<RepresentantInfos>,
                        val suppleants: List<RepresentantInfos>)

data class FullOrganisme(val infos: OrganismeInfos,
                         val deliberations: List<DeliberationInfos>,
                         val representants: List<RepresentantInfos>,
                         val suppleants: List<RepresentantInfos>,
                         val instances: List<FullInstance>)
