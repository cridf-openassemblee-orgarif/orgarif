package orgarif.endpoint

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.domain.Organisme
import orgarif.domain.Representant
import orgarif.service.AuditTrailService
import orgarif.service.EditionService
import java.io.Serializable
import javax.validation.Valid

/**
 * REST controller for managing [Organisme].
 */
@RestController
@RequestMapping("/api/edition")
open class EditionEndpoint(@Value("\${jhipster.clientApp.name}") val applicationName: String,
                           val editionService: EditionService,
                           val auditTrailService: AuditTrailService) {

    private val log = LoggerFactory.getLogger(EditionEndpoint::class.java)

    data class NewPosition(val representant: Representant,
                           val newPosition: Int) : Serializable

    @PutMapping("/moveRepresentant")
    open fun moveRepresentant(@Valid @RequestBody newPosition: NewPosition): ResponseEntity<List<Representant>> {
        val newReprentants = editionService.moveRepresentant(newPosition.representant, newPosition.newPosition)
        auditTrailService.logUpdate(newPosition, newPosition.representant.id)
        return ResponseEntity.ok().body(newReprentants)
    }

}
