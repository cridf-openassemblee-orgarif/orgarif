package orgarif.endpoint

import io.github.jhipster.web.util.HeaderUtil
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import orgarif.domain.Deliberation
import orgarif.domain.Organisme
import orgarif.repository.DeliberationRepository
import orgarif.repository.search.DeliberationSearchRepository
import orgarif.service.AuditTrailService
import orgarif.service.SaisieService
import orgarif.web.rest.errors.BadRequestAlertException
import java.net.URI
import javax.validation.Valid

/**
 * REST controller for managing [Organisme].
 */
@RestController
@RequestMapping("/api/saisie")
open class SaisieEndpoint(@Value("\${jhipster.clientApp.name}") val applicationName: String,
                          val saisieService: SaisieService,
                          val deliberationRepository: DeliberationRepository,
                          val deliberationSearchRepository: DeliberationSearchRepository,
                          val auditTrailService: AuditTrailService) {

    private val log = LoggerFactory.getLogger(SaisieEndpoint::class.java)

    private val ENTITY_NAME = "organisme"

    @PostMapping
    open fun createOrganisme(@Valid @RequestBody organisme: Organisme): ResponseEntity<Organisme> {
        if (organisme.id != null) {
            throw BadRequestAlertException("A new organisme cannot already have an ID", ENTITY_NAME, "idexists")
        }
        val result = saisieService.saveSaisie(organisme)
        auditTrailService.logCreation(result, result.id)
        return ResponseEntity.created(URI("/api/organismes/" + result.id!!))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.id!!.toString()))
            .body(result)
    }

    // TODO remove
    @GetMapping("/last-deliberations")
    open fun getLastDeliberations(): ResponseEntity<List<Deliberation>> {
        val page = deliberationRepository.findAll(PageRequest.of(0, 5,
            Sort.by(Sort.Direction.DESC, "creationDate")))
        return ResponseEntity.ok().body(page.content)
    }

}
