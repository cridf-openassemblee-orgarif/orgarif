package orgarif.service

import org.hibernate.Hibernate
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import orgarif.domain.Representant
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
}
