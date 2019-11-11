package orgarif.web.rest;

import orgarif.domain.Deliberation;
import orgarif.repository.DeliberationRepository;
import orgarif.repository.search.DeliberationSearchRepository;
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
import org.springframework.transaction.annotation.Transactional;
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
 * REST controller for managing {@link orgarif.domain.Deliberation}.
 */
//@RestController
@RequestMapping("/api")
@Transactional
public class DeliberationResource {

    private final Logger log = LoggerFactory.getLogger(DeliberationResource.class);

    private static final String ENTITY_NAME = "deliberation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliberationRepository deliberationRepository;

    private final DeliberationSearchRepository deliberationSearchRepository;

    public DeliberationResource(DeliberationRepository deliberationRepository, DeliberationSearchRepository deliberationSearchRepository) {
        this.deliberationRepository = deliberationRepository;
        this.deliberationSearchRepository = deliberationSearchRepository;
    }

    /**
     * {@code POST  /deliberations} : Create a new deliberation.
     *
     * @param deliberation the deliberation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliberation, or with status {@code 400 (Bad Request)} if the deliberation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/deliberations")
    public ResponseEntity<Deliberation> createDeliberation(@Valid @RequestBody Deliberation deliberation) throws URISyntaxException {
        log.debug("REST request to save Deliberation : {}", deliberation);
        if (deliberation.getId() != null) {
            throw new BadRequestAlertException("A new deliberation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Deliberation result = deliberationRepository.save(deliberation);
        deliberationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/deliberations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /deliberations} : Updates an existing deliberation.
     *
     * @param deliberation the deliberation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliberation,
     * or with status {@code 400 (Bad Request)} if the deliberation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliberation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/deliberations")
    public ResponseEntity<Deliberation> updateDeliberation(@Valid @RequestBody Deliberation deliberation) throws URISyntaxException {
        log.debug("REST request to update Deliberation : {}", deliberation);
        if (deliberation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Deliberation result = deliberationRepository.save(deliberation);
        deliberationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, deliberation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /deliberations} : get all the deliberations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliberations in body.
     */
    @GetMapping("/deliberations")
    public ResponseEntity<List<Deliberation>> getAllDeliberations(Pageable pageable) {
        log.debug("REST request to get a page of Deliberations");
        Page<Deliberation> page = deliberationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /deliberations/:id} : get the "id" deliberation.
     *
     * @param id the id of the deliberation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliberation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deliberations/{id}")
    public ResponseEntity<Deliberation> getDeliberation(@PathVariable Long id) {
        log.debug("REST request to get Deliberation : {}", id);
        Optional<Deliberation> deliberation = deliberationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deliberation);
    }

    /**
     * {@code DELETE  /deliberations/:id} : delete the "id" deliberation.
     *
     * @param id the id of the deliberation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deliberations/{id}")
    public ResponseEntity<Void> deleteDeliberation(@PathVariable Long id) {
        log.debug("REST request to delete Deliberation : {}", id);
        deliberationRepository.deleteById(id);
        deliberationSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/deliberations?query=:query} : search for the deliberation corresponding
     * to the query.
     *
     * @param query the query of the deliberation search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/deliberations")
    public ResponseEntity<List<Deliberation>> searchDeliberations(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Deliberations for query {}", query);
        Page<Deliberation> page = deliberationSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}
