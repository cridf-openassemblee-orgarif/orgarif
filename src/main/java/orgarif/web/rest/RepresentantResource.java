package orgarif.web.rest;

import orgarif.domain.Representant;
import orgarif.repository.RepresentantRepository;
import orgarif.repository.search.RepresentantSearchRepository;
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
 * REST controller for managing {@link orgarif.domain.Representant}.
 */
//@RestController
@RequestMapping("/api")
public class RepresentantResource {

    private final Logger log = LoggerFactory.getLogger(RepresentantResource.class);

    private static final String ENTITY_NAME = "representant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepresentantRepository representantRepository;

    private final RepresentantSearchRepository representantSearchRepository;

    public RepresentantResource(RepresentantRepository representantRepository, RepresentantSearchRepository representantSearchRepository) {
        this.representantRepository = representantRepository;
        this.representantSearchRepository = representantSearchRepository;
    }

    /**
     * {@code POST  /representants} : Create a new representant.
     *
     * @param representant the representant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new representant, or with status {@code 400 (Bad Request)} if the representant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/representants")
    public ResponseEntity<Representant> createRepresentant(@Valid @RequestBody Representant representant) throws URISyntaxException {
        log.debug("REST request to save Representant : {}", representant);
        if (representant.getId() != null) {
            throw new BadRequestAlertException("A new representant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Representant result = representantRepository.save(representant);
        representantSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/representants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /representants} : Updates an existing representant.
     *
     * @param representant the representant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated representant,
     * or with status {@code 400 (Bad Request)} if the representant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the representant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/representants")
    public ResponseEntity<Representant> updateRepresentant(@Valid @RequestBody Representant representant) throws URISyntaxException {
        log.debug("REST request to update Representant : {}", representant);
        if (representant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Representant result = representantRepository.save(representant);
        representantSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, representant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /representants} : get all the representants.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of representants in body.
     */
    @GetMapping("/representants")
    public ResponseEntity<List<Representant>> getAllRepresentants(Pageable pageable) {
        log.debug("REST request to get a page of Representants");
        Page<Representant> page = representantRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /representants/:id} : get the "id" representant.
     *
     * @param id the id of the representant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the representant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/representants/{id}")
    public ResponseEntity<Representant> getRepresentant(@PathVariable Long id) {
        log.debug("REST request to get Representant : {}", id);
        Optional<Representant> representant = representantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(representant);
    }

    /**
     * {@code DELETE  /representants/:id} : delete the "id" representant.
     *
     * @param id the id of the representant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/representants/{id}")
    public ResponseEntity<Void> deleteRepresentant(@PathVariable Long id) {
        log.debug("REST request to delete Representant : {}", id);
        representantRepository.deleteById(id);
        representantSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/representants?query=:query} : search for the representant corresponding
     * to the query.
     *
     * @param query the query of the representant search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/representants")
    public ResponseEntity<List<Representant>> searchRepresentants(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Representants for query {}", query);
        Page<Representant> page = representantSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
