package orgarif.service

import org.hibernate.Hibernate
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import orgarif.domain.Elu
import orgarif.domain.Representant
import orgarif.domain.RepresentantOrSuppleant
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
        val list = getList(representant)
        list.remove(representant)
        list.add(newPosition, representant)
        list.forEachIndexed { index, representant ->
            if (index != representant.position) {
                representant.position = index
                representantRepository.save(representant)
            }
            Hibernate.initialize(representant.representantOrganisme)
            Hibernate.initialize(representant.suppleantOrganisme)
        }
        return list
    }

    private fun getList(representant: Representant) =
        let {
            representant.representantOrganisme?.let { organismeRepository.getOne(it.id) }?.representants
                ?: representant.suppleantOrganisme?.let { organismeRepository.getOne(it.id) }?.suppleants
                ?: representant.representantInstance?.let { instanceRepository.getOne(it.id) }?.representants
                ?: representant.suppleantInstance?.let { instanceRepository.getOne(it.id) }?.suppleants
                ?: throw IllegalStateException()
        }
            .toList()
            .sortedBy { it.position }
            .toMutableList()

    @Transactional
    open fun deleteRepresentant(representantId: Long): List<Representant> {
        TODO()
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
        val representants = getList(r)
        r.position = representants.size
        representantRepository.save(r)
        representants += r
        // is necessary for cache
        organisme?.let {
            when (representantOrSuppleant) {
                RepresentantOrSuppleant.representant -> {
                    it.representants = representants.toSet()
                }
                RepresentantOrSuppleant.suppleant -> {
                    it.suppleants = representants.toSet()
                }
            }
        }
        instance?.let {
            when (representantOrSuppleant) {
                RepresentantOrSuppleant.representant -> {
                    it.representants = representants.toSet()
                }
                RepresentantOrSuppleant.suppleant -> {
                    it.suppleants = representants.toSet()
                }
            }
        }
        return representants
    }
}
