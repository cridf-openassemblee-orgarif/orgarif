package orgarif.web.rest;

import orgarif.domain.Elu;
import orgarif.repository.EluRepository;
import orgarif.repository.search.EluSearchRepository;
import orgarif.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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
 * REST controller for managing {@link orgarif.domain.Elu}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EluResource {

    private final Logger log = LoggerFactory.getLogger(EluResource.class);

    private static final String ENTITY_NAME = "elu";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EluRepository eluRepository;

    private final EluSearchRepository eluSearchRepository;

    public EluResource(EluRepository eluRepository, EluSearchRepository eluSearchRepository) {
        this.eluRepository = eluRepository;
        this.eluSearchRepository = eluSearchRepository;
    }

    /**
     * {@code POST  /elus} : Create a new elu.
     *
     * @param elu the elu to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new elu, or with status {@code 400 (Bad Request)} if the elu has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/elus")
    public ResponseEntity<Elu> createElu(@Valid @RequestBody Elu elu) throws URISyntaxException {
        log.debug("REST request to save Elu : {}", elu);
        if (elu.getId() != null) {
            throw new BadRequestAlertException("A new elu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Elu result = eluRepository.save(elu);
        eluSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/elus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /elus} : Updates an existing elu.
     *
     * @param elu the elu to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated elu,
     * or with status {@code 400 (Bad Request)} if the elu is not valid,
     * or with status {@code 500 (Internal Server Error)} if the elu couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/elus")
    public ResponseEntity<Elu> updateElu(@Valid @RequestBody Elu elu) throws URISyntaxException {
        log.debug("REST request to update Elu : {}", elu);
        if (elu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Elu result = eluRepository.save(elu);
        eluSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, elu.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /elus} : get all the elus.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of elus in body.
     */
    @GetMapping("/elus")
    public List<Elu> getAllElus() {
        log.debug("REST request to get all Elus");
        return eluRepository.findAll();
    }

    /**
     * {@code GET  /elus/:id} : get the "id" elu.
     *
     * @param id the id of the elu to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the elu, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/elus/{id}")
    public ResponseEntity<Elu> getElu(@PathVariable Long id) {
        log.debug("REST request to get Elu : {}", id);
        Optional<Elu> elu = eluRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(elu);
    }

    /**
     * {@code DELETE  /elus/:id} : delete the "id" elu.
     *
     * @param id the id of the elu to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/elus/{id}")
    public ResponseEntity<Void> deleteElu(@PathVariable Long id) {
        log.debug("REST request to delete Elu : {}", id);
        eluRepository.deleteById(id);
        eluSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/elus?query=:query} : search for the elu corresponding
     * to the query.
     *
     * @param query the query of the elu search.
     * @return the result of the search.
     */
    @GetMapping("/_search/elus")
    public List<Elu> searchElus(@RequestParam String query) {
        log.debug("REST request to search Elus for query {}", query);
        return StreamSupport
            .stream(eluSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
