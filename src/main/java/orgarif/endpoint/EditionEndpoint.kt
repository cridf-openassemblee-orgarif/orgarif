package orgarif.endpoint

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.domain.Elu
import orgarif.domain.Organisme
import orgarif.domain.Representant
import orgarif.domain.RepresentantOrSuppleant
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

    data class RepresentantNewPosition(val representant: Representant,
                                       val newPosition: Int) : Serializable

    data class AddRepresentant(val elu: Elu,
                               val organismeId: Long?,
                               val instanceId: Long?,
                               val representantOrSuppleant: RepresentantOrSuppleant) : Serializable

    @PutMapping("/moveRepresentant")
    open fun moveRepresentant(@Valid @RequestBody newPosition: RepresentantNewPosition): ResponseEntity<List<Representant>> {
        val newRepresentants = editionService.moveRepresentant(newPosition.representant, newPosition.newPosition)
        auditTrailService.logUpdate(newPosition, newPosition.representant.id)
        return ResponseEntity.ok().body(newRepresentants)
    }

    @PutMapping("/deleteRepresentant")
    open fun deleteRepresentant(@Valid @RequestBody representant: Representant): ResponseEntity<List<Representant>> {
        val newRepresentants = editionService.deleteRepresentant(representant)
        auditTrailService.logDeletion(Representant::class.java, representant.id)
        return ResponseEntity.ok().body(newRepresentants)
    }

    @PutMapping("/addRepresentant")
    open fun addRepresentant(@Valid @RequestBody addRepresentant: AddRepresentant): ResponseEntity<List<Representant>> {
        val newRepresentants = editionService.addRepresentant(addRepresentant.elu,
            addRepresentant.organismeId, addRepresentant.instanceId, addRepresentant.representantOrSuppleant)
        val r = newRepresentants.last()
        auditTrailService.logUpdate(addRepresentant, r.id)
        return ResponseEntity.ok().body(newRepresentants)
    }

}
