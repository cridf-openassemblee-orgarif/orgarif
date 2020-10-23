package orgarif.web.rest;

import orgarif.domain.Instance;
import orgarif.repository.InstanceRepository;
import orgarif.repository.search.InstanceSearchRepository;
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
 * REST controller for managing {@link orgarif.domain.Instance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InstanceResource {

    private final Logger log = LoggerFactory.getLogger(InstanceResource.class);

    private static final String ENTITY_NAME = "instance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstanceRepository instanceRepository;

    private final InstanceSearchRepository instanceSearchRepository;

    public InstanceResource(InstanceRepository instanceRepository, InstanceSearchRepository instanceSearchRepository) {
        this.instanceRepository = instanceRepository;
        this.instanceSearchRepository = instanceSearchRepository;
    }

    /**
     * {@code POST  /instances} : Create a new instance.
     *
     * @param instance the instance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new instance, or with status {@code 400 (Bad Request)} if the instance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/instances")
    public ResponseEntity<Instance> createInstance(@Valid @RequestBody Instance instance) throws URISyntaxException {
        log.debug("REST request to save Instance : {}", instance);
        if (instance.getId() != null) {
            throw new BadRequestAlertException("A new instance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Instance result = instanceRepository.save(instance);
        instanceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /instances} : Updates an existing instance.
     *
     * @param instance the instance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instance,
     * or with status {@code 400 (Bad Request)} if the instance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the instance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/instances")
    public ResponseEntity<Instance> updateInstance(@Valid @RequestBody Instance instance) throws URISyntaxException {
        log.debug("REST request to update Instance : {}", instance);
        if (instance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Instance result = instanceRepository.save(instance);
        instanceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, instance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /instances} : get all the instances.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of instances in body.
     */
    @GetMapping("/instances")
    public ResponseEntity<List<Instance>> getAllInstances(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Instances");
        Page<Instance> page;
        if (eagerload) {
            page = instanceRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = instanceRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /instances/:id} : get the "id" instance.
     *
     * @param id the id of the instance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the instance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/instances/{id}")
    public ResponseEntity<Instance> getInstance(@PathVariable Long id) {
        log.debug("REST request to get Instance : {}", id);
        Optional<Instance> instance = instanceRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(instance);
    }

    /**
     * {@code DELETE  /instances/:id} : delete the "id" instance.
     *
     * @param id the id of the instance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/instances/{id}")
    public ResponseEntity<Void> deleteInstance(@PathVariable Long id) {
        log.debug("REST request to delete Instance : {}", id);
        instanceRepository.deleteById(id);
        instanceSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/instances?query=:query} : search for the instance corresponding
     * to the query.
     *
     * @param query the query of the instance search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/instances")
    public ResponseEntity<List<Instance>> searchInstances(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Instances for query {}", query);
        Page<Instance> page = instanceSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}
