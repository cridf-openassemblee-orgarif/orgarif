package orgarif.web.rest;

import orgarif.domain.AuditTrail;
import orgarif.repository.AuditTrailRepository;
import orgarif.repository.search.AuditTrailSearchRepository;
import orgarif.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link orgarif.domain.AuditTrail}.
 */
//@RestController
@RequestMapping("/api")
@Transactional
public class AuditTrailResource {

    private final Logger log = LoggerFactory.getLogger(AuditTrailResource.class);

    private static final String ENTITY_NAME = "auditTrail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AuditTrailRepository auditTrailRepository;

    private final AuditTrailSearchRepository auditTrailSearchRepository;

    public AuditTrailResource(AuditTrailRepository auditTrailRepository, AuditTrailSearchRepository auditTrailSearchRepository) {
        this.auditTrailRepository = auditTrailRepository;
        this.auditTrailSearchRepository = auditTrailSearchRepository;
    }

    /**
     * {@code POST  /audit-trails} : Create a new auditTrail.
     *
     * @param auditTrail the auditTrail to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new auditTrail, or with status {@code 400 (Bad Request)} if the auditTrail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/audit-trails")
    public ResponseEntity<AuditTrail> createAuditTrail(@RequestBody AuditTrail auditTrail) throws URISyntaxException {
        log.debug("REST request to save AuditTrail : {}", auditTrail);
        if (auditTrail.getId() != null) {
            throw new BadRequestAlertException("A new auditTrail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AuditTrail result = auditTrailRepository.save(auditTrail);
        auditTrailSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/audit-trails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /audit-trails} : Updates an existing auditTrail.
     *
     * @param auditTrail the auditTrail to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated auditTrail,
     * or with status {@code 400 (Bad Request)} if the auditTrail is not valid,
     * or with status {@code 500 (Internal Server Error)} if the auditTrail couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/audit-trails")
    public ResponseEntity<AuditTrail> updateAuditTrail(@RequestBody AuditTrail auditTrail) throws URISyntaxException {
        log.debug("REST request to update AuditTrail : {}", auditTrail);
        if (auditTrail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AuditTrail result = auditTrailRepository.save(auditTrail);
        auditTrailSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, auditTrail.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /audit-trails} : get all the auditTrails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of auditTrails in body.
     */
    @GetMapping("/audit-trails")
    public List<AuditTrail> getAllAuditTrails() {
        log.debug("REST request to get all AuditTrails");
        return auditTrailRepository.findAll();
    }

    /**
     * {@code GET  /audit-trails/:id} : get the "id" auditTrail.
     *
     * @param id the id of the auditTrail to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the auditTrail, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/audit-trails/{id}")
    public ResponseEntity<AuditTrail> getAuditTrail(@PathVariable Long id) {
        log.debug("REST request to get AuditTrail : {}", id);
        Optional<AuditTrail> auditTrail = auditTrailRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(auditTrail);
    }

    /**
     * {@code DELETE  /audit-trails/:id} : delete the "id" auditTrail.
     *
     * @param id the id of the auditTrail to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/audit-trails/{id}")
    public ResponseEntity<Void> deleteAuditTrail(@PathVariable Long id) {
        log.debug("REST request to delete AuditTrail : {}", id);
        auditTrailRepository.deleteById(id);
        auditTrailSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/audit-trails?query=:query} : search for the auditTrail corresponding
     * to the query.
     *
     * @param query the query of the auditTrail search.
     * @return the result of the search.
     */
    @GetMapping("/_search/audit-trails")
    public List<AuditTrail> searchAuditTrails(@RequestParam String query) {
        log.debug("REST request to search AuditTrails for query {}", query);
        return StreamSupport
            .stream(auditTrailSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
