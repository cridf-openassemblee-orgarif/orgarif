package orgarif.web.rest;

import orgarif.domain.Organisme;
import orgarif.repository.OrganismeRepository;
import orgarif.repository.search.OrganismeSearchRepository;
import orgarif.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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
 * REST controller for managing {@link orgarif.domain.Organisme}.
 */
@RestController
@RequestMapping("/api")
public class OrganismeResource {

    private final Logger log = LoggerFactory.getLogger(OrganismeResource.class);

    private static final String ENTITY_NAME = "organisme";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrganismeRepository organismeRepository;

    private final OrganismeSearchRepository organismeSearchRepository;

    public OrganismeResource(OrganismeRepository organismeRepository, OrganismeSearchRepository organismeSearchRepository) {
        this.organismeRepository = organismeRepository;
        this.organismeSearchRepository = organismeSearchRepository;
    }

    /**
     * {@code POST  /organismes} : Create a new organisme.
     *
     * @param organisme the organisme to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new organisme, or with status {@code 400 (Bad Request)} if the organisme has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/organismes")
    public ResponseEntity<Organisme> createOrganisme(@Valid @RequestBody Organisme organisme) throws URISyntaxException {
        log.debug("REST request to save Organisme : {}", organisme);
        if (organisme.getId() != null) {
            throw new BadRequestAlertException("A new organisme cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Organisme result = organismeRepository.save(organisme);
        organismeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/organismes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /organismes} : Updates an existing organisme.
     *
     * @param organisme the organisme to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated organisme,
     * or with status {@code 400 (Bad Request)} if the organisme is not valid,
     * or with status {@code 500 (Internal Server Error)} if the organisme couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/organismes")
    public ResponseEntity<Organisme> updateOrganisme(@Valid @RequestBody Organisme organisme) throws URISyntaxException {
        log.debug("REST request to update Organisme : {}", organisme);
        if (organisme.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Organisme result = organismeRepository.save(organisme);
        organismeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, organisme.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /organismes} : get all the organismes.
     *

     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of organismes in body.
     */
    @GetMapping("/organismes")
    public ResponseEntity<List<Organisme>> getAllOrganismes(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Organismes");
        Page<Organisme> page;
        if (eagerload) {
            page = organismeRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = organismeRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /organismes/:id} : get the "id" organisme.
     *
     * @param id the id of the organisme to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the organisme, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/organismes/{id}")
    public ResponseEntity<Organisme> getOrganisme(@PathVariable Long id) {
        log.debug("REST request to get Organisme : {}", id);
        Optional<Organisme> organisme = organismeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(organisme);
    }

    /**
     * {@code DELETE  /organismes/:id} : delete the "id" organisme.
     *
     * @param id the id of the organisme to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/organismes/{id}")
    public ResponseEntity<Void> deleteOrganisme(@PathVariable Long id) {
        log.debug("REST request to delete Organisme : {}", id);
        organismeRepository.deleteById(id);
        organismeSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/organismes?query=:query} : search for the organisme corresponding
     * to the query.
     *
     * @param query the query of the organisme search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/organismes")
    public ResponseEntity<List<Organisme>> searchOrganismes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Organismes for query {}", query);
        Page<Organisme> page = organismeSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
