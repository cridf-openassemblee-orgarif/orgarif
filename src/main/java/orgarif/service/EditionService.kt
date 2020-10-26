package orgarif.service

import org.hibernate.Hibernate
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import orgarif.domain.*
import orgarif.repository.InstanceRepository
import orgarif.repository.OrganismeRepository
import orgarif.repository.RepresentantRepository
import orgarif.repository.search.RepresentantSearchRepository

@Service
open class EditionService(val organismeRepository: OrganismeRepository,
                          val instanceRepository: InstanceRepository,
                          val representantRepository: RepresentantRepository,
                          val representantSearchRepository: RepresentantSearchRepository) {

    private val logger = LoggerFactory.getLogger(EditionService::class.java)

    @Transactional
    open fun moveRepresentant(representant: Representant, newPosition: Int): List<Representant> {
        val representants = getOrganisme(representant)
            .let { getRepresentants(it.first, it.second) }
            .let { representantsToList(it) }
        representants.remove(representant)
        representants.add(newPosition, representant)
        saveAndUpdatePositions(representants)
        return representants
    }

    open fun saveAndUpdatePositions(representants: List<Representant>) {
        representants.forEachIndexed { index, representant ->
            if (index != representant.position) {
                representant.position = index
                representantRepository.save(representant)
            }
            Hibernate.initialize(representant.representantOrganisme)
            Hibernate.initialize(representant.suppleantOrganisme)
        }
    }

    private fun getOrganisme(representant: Representant): Pair<HasRepresentants, RepresentantOrSuppleant> =
        representant.representantOrganisme?.let { organismeRepository.getOne(it.id) }?.let { it to RepresentantOrSuppleant.representant }
            ?: representant.suppleantOrganisme?.let { organismeRepository.getOne(it.id) }?.let { it to RepresentantOrSuppleant.suppleant }
            ?: representant.representantInstance?.let { instanceRepository.getOne(it.id) }?.let { it to RepresentantOrSuppleant.representant }
            ?: representant.suppleantInstance?.let { instanceRepository.getOne(it.id) }?.let { it to RepresentantOrSuppleant.suppleant }
            ?: throw IllegalStateException()

    private fun getRepresentants(organismeOrInstance: HasRepresentants, representantOrSuppleant: RepresentantOrSuppleant) =
        when (representantOrSuppleant) {
            RepresentantOrSuppleant.representant -> organismeOrInstance.representants
            RepresentantOrSuppleant.suppleant -> organismeOrInstance.suppleants
        }

    private fun representantsToList(representants: Set<Representant>) = representants
        .toList()
        .sortedBy { it.position }
        .toMutableList()

    @Transactional
    open fun deleteRepresentant(representant: Representant): List<Representant> {
        val (organismeOrInstance, representantOrSuppleant) = getOrganisme(representant)
        val representants = getRepresentants(organismeOrInstance, representantOrSuppleant)
        representantRepository.delete(representant)
        representants.remove(representant)
        saveOrganismeOrInstance(organismeOrInstance)
        val list = representantsToList(representants)
        saveAndUpdatePositions(list)
        return list
    }

    // is necessary for cache
    open fun saveOrganismeOrInstance(organismeOrInstance: HasRepresentants) {
        when (organismeOrInstance) {
            is Organisme -> organismeRepository.save(organismeOrInstance)
            is Instance -> instanceRepository.save(organismeOrInstance)
        }
    }

    @Transactional
    open fun addRepresentant(elu: Elu,
                             organismeId: Long?,
                             instanceId: Long?,
                             representantOrSuppleant: RepresentantOrSuppleant): List<Representant> {
        if ((organismeId == null && instanceId == null) || (organismeId != null && instanceId != null)) {
            throw IllegalArgumentException()
        }
        val organisme = organismeId?.let { organismeRepository.getOne(it) }
        val instance = instanceId?.let { instanceRepository.getOne(it) }
        val r = Representant().apply {
            this.elu = elu
            when (representantOrSuppleant) {
                RepresentantOrSuppleant.representant -> {
                    representantOrganisme = organisme
                    representantInstance = instance
                }
                RepresentantOrSuppleant.suppleant -> {
                    suppleantOrganisme = organisme
                    suppleantInstance = instance
                }
            }
        }
        val organismeOrInstance = organisme ?: instance ?: throw RuntimeException()
        val representants = getRepresentants(organismeOrInstance, representantOrSuppleant)
        r.position = representants.size
        representantRepository.save(r)
        representants.add(r)
        saveOrganismeOrInstance(organismeOrInstance)
        return representantsToList(representants)
    }
}
