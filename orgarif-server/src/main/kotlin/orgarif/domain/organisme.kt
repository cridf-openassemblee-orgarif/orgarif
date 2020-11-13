import orgarif.domain.DeliberationId
import orgarif.domain.EluId
import orgarif.domain.LienDeliberationId
import orgarif.domain.RepresentantId
import orgarif.repository.sql.InstanceDao
import orgarif.repository.sql.OrganismeDao
import java.time.LocalDate

enum class RepresentantOrSuppleant { representant, suppleant }

typealias OrganismeInfos = OrganismeDao.Record

typealias InstanceInfos = InstanceDao.Record

data class Representant(val id: RepresentantId,
                        val eluId: EluId)

data class DeliberationInfos(val id: DeliberationId,
                             val libelle: String,
                             val deliberationDate: LocalDate)

data class LienDeliberationInfos(val id: LienDeliberationId,
                                 val deliberation: DeliberationInfos)

data class FullInstance(val infos: InstanceInfos,
                        val lienDeliberations: List<LienDeliberationInfos>,
                        val representants: List<Representant>,
                        val suppleants: List<Representant>)

data class FullOrganisme(val infos: OrganismeInfos,
                         val lienDeliberations: List<LienDeliberationInfos>,
                         val representants: List<Representant>,
                         val suppleants: List<Representant>,
                         val instances: List<FullInstance>)
