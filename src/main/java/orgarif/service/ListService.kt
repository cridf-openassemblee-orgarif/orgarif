package orgarif.service

import org.hibernate.Hibernate
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import orgarif.domain.Organisme
import orgarif.repository.EluRepository
import orgarif.repository.OrganismeRepository
import java.util.*

@Service
open class ListService(val organismeRepository: OrganismeRepository,
                       val eluRepository: EluRepository) {

    @Transactional
    open fun get(id: Long): Optional<Organisme> {
        val optional = organismeRepository.findById(id)
        optional.ifPresent {
            optional.get().apply {
                Hibernate.initialize(representants)
                Hibernate.initialize(suppleants)
                Hibernate.initialize(deliberations)
                instances.forEach { i ->
                    Hibernate.initialize(i.representants)
                    Hibernate.initialize(i.suppleants)
                    Hibernate.initialize(i.deliberations)
                }
            }
        }
        return optional
    }

    @Transactional
    open fun getOrganismes(pageable: Pageable): Page<Organisme> {
        val organismes = organismeRepository.findAll(PageRequest.of(pageable.pageNumber, pageable.pageSize,
            Sort.by("creationDate").descending()))
        organismes.forEach { o ->
            Hibernate.initialize(o.representants)
            Hibernate.initialize(o.suppleants)
            Hibernate.initialize(o.deliberations)
            o.instances.forEach { i ->
                Hibernate.initialize(i.representants)
                Hibernate.initialize(i.suppleants)
                Hibernate.initialize(i.deliberations)
            }
        }
        return organismes
    }

    @Transactional
    open fun getElus() = eluRepository.findAll()

}
