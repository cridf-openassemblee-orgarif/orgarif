package orgarif.service

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import orgarif.domain.Deliberation
import orgarif.domain.Organisme
import orgarif.domain.Representant
import orgarif.repository.DeliberationRepository
import orgarif.repository.InstanceRepository
import orgarif.repository.OrganismeRepository
import orgarif.repository.RepresentantRepository
import orgarif.repository.search.DeliberationSearchRepository
import orgarif.repository.search.InstanceSearchRepository
import orgarif.repository.search.OrganismeSearchRepository
import orgarif.repository.search.RepresentantSearchRepository
import java.time.Instant
import java.util.*

@Service
open class SaisieService(val organismeRepository: OrganismeRepository,
                         val organismeSearchRepository: OrganismeSearchRepository,
                         val representantRepository: RepresentantRepository,
                         val representantSearchRepository: RepresentantSearchRepository,
                         val instanceRepository: InstanceRepository,
                         val instanceSearchRepository: InstanceSearchRepository,
                         val deliberationRepository: DeliberationRepository,
                         val deliberationSearchRepository: DeliberationSearchRepository,
                         val dateService: DateService) {

    private val log = LoggerFactory.getLogger(SaisieService::class.java)

    @Transactional
    open fun saveSaisie(organisme: Organisme): Organisme {
        log.debug("Request to save Organisme : {}", organisme)
        if (organisme.creationDate != null) {
            throw NotImplementedError()
        }
        organisme.uid = UUID.randomUUID()
        val now = dateService.now()
        organisme.creationDate = now
        organisme.lastModificationDate = now
        val result = organismeRepository.save(organisme)
        organismeSearchRepository.save(result)
        organisme.representants.forEach {
            it.representantOrganisme = result
            saveRepresentant(it)
        }
        organisme.suppleants.forEach {
            it.suppleantOrganisme = result
            saveRepresentant(it)
        }
        organisme.instances.forEach { i ->
            i.deliberations = i.deliberations.map { handleDeliberation(it, now) }.toSet()
            i.organisme = result
            val instanceResult = instanceRepository.save(i)
            instanceSearchRepository.save(instanceResult)
            i.representants.forEach {
                it.representantInstance = instanceResult
                saveRepresentant(it)
            }
            i.suppleants.forEach {
                it.suppleantInstance = instanceResult
                saveRepresentant(it)
            }
        }
        organisme.deliberations = organisme.deliberations.map { handleDeliberation(it, now) }.toSet()
        return result
    }

    protected fun saveRepresentant(representant: Representant): Representant {
        val representantResult = representantRepository.save(representant)
        representantSearchRepository.save(representantResult)
        return representantResult
    }

    protected fun handleDeliberation(deliberation: Deliberation,
                                     now: Instant): Deliberation =
        if (deliberation.id == null) {
            val optional  =deliberationRepository.findByLabel(deliberation.label)
            if (optional.isPresent) {
                optional.get()
//            deliberation.creationDate = now
//            deliberation.label += "-"
//            val deliberationResult = deliberationRepository.save(deliberation)
//            deliberationSearchRepository.save(deliberationResult)
//            deliberationMap[deliberation.label] = deliberationResult
//            deliberationResult
            } else {
                deliberation.creationDate = now
                val deliberationResult = deliberationRepository.save(deliberation)
                deliberationSearchRepository.save(deliberationResult)
                deliberationResult
            }
        } else {
            deliberation
        }
}
