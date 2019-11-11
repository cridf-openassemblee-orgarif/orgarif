package orgarif.web.rest;

import orgarif.domain.TypeStructure;
import orgarif.repository.TypeStructureRepository;
import orgarif.repository.search.TypeStructureSearchRepository;
import orgarif.service.AuditTrailService;
import orgarif.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link orgarif.domain.TypeStructure}.
 */
@RestController
@RequestMapping("/api")
public class TypeStructureResource {

    private final Logger log = LoggerFactory.getLogger(TypeStructureResource.class);

    private static final String ENTITY_NAME = "typeStructure";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeStructureRepository typeStructureRepository;

    private final TypeStructureSearchRepository typeStructureSearchRepository;

    private final AuditTrailService auditTrailService;

    public TypeStructureResource(TypeStructureRepository typeStructureRepository, TypeStructureSearchRepository typeStructureSearchRepository, AuditTrailService auditTrailService) {
        this.typeStructureRepository = typeStructureRepository;
        this.typeStructureSearchRepository = typeStructureSearchRepository;
        this.auditTrailService = auditTrailService;
    }

    /**
     * {@code POST  /type-structures} : Create a new typeStructure.
     *
     * @param typeStructure the typeStructure to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeStructure, or with status {@code 400 (Bad Request)} if the typeStructure has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-structures")
    public ResponseEntity<TypeStructure> createTypeStructure(@Valid @RequestBody TypeStructure typeStructure) throws URISyntaxException {
        log.debug("REST request to save TypeStructure : {}", typeStructure);
        if (typeStructure.getId() != null) {
            throw new BadRequestAlertException("A new typeStructure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeStructure result = typeStructureRepository.save(typeStructure);
        typeStructureSearchRepository.save(result);
        auditTrailService.logCreation(result, result.getId());
        return ResponseEntity.created(new URI("/api/type-structures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-structures} : Updates an existing typeStructure.
     *
     * @param typeStructure the typeStructure to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeStructure,
     * or with status {@code 400 (Bad Request)} if the typeStructure is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeStructure couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-structures")
    public ResponseEntity<TypeStructure> updateTypeStructure(@Valid @RequestBody TypeStructure typeStructure) throws URISyntaxException {
        log.debug("REST request to update TypeStructure : {}", typeStructure);
        if (typeStructure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeStructure result = typeStructureRepository.save(typeStructure);
        typeStructureSearchRepository.save(result);
        auditTrailService.logUpdate(result, result.getId());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, typeStructure.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /type-structures} : get all the typeStructures.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeStructures in body.
     */
    @GetMapping("/type-structures")
    public List<TypeStructure> getAllTypeStructures() {
        log.debug("REST request to get all TypeStructures");
        return typeStructureRepository.findAll();
    }

    /**
     * {@code GET  /type-structures/:id} : get the "id" typeStructure.
     *
     * @param id the id of the typeStructure to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeStructure, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-structures/{id}")
    public ResponseEntity<TypeStructure> getTypeStructure(@PathVariable Long id) {
        log.debug("REST request to get TypeStructure : {}", id);
        Optional<TypeStructure> typeStructure = typeStructureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeStructure);
    }

    /**
     * {@code DELETE  /type-structures/:id} : delete the "id" typeStructure.
     *
     * @param id the id of the typeStructure to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-structures/{id}")
    public ResponseEntity<Void> deleteTypeStructure(@PathVariable Long id) {
        log.debug("REST request to delete TypeStructure : {}", id);
        typeStructureRepository.deleteById(id);
        typeStructureSearchRepository.deleteById(id);
        auditTrailService.logDeletion(TypeStructure.class, id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/type-structures?query=:query} : search for the typeStructure corresponding
     * to the query.
     *
     * @param query the query of the typeStructure search.
     * @return the result of the search.
     */
    @GetMapping("/_search/type-structures")
    public List<TypeStructure> searchTypeStructures(@RequestParam String query) {
        log.debug("REST request to search TypeStructures for query {}", query);
        return StreamSupport
            .stream(typeStructureSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
