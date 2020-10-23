package orgarif.web.rest;

import orgarif.domain.NatureJuridique;
import orgarif.repository.NatureJuridiqueRepository;
import orgarif.repository.search.NatureJuridiqueSearchRepository;
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
 * REST controller for managing {@link orgarif.domain.NatureJuridique}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NatureJuridiqueResource {

    private final Logger log = LoggerFactory.getLogger(NatureJuridiqueResource.class);

    private static final String ENTITY_NAME = "natureJuridique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NatureJuridiqueRepository natureJuridiqueRepository;

    private final NatureJuridiqueSearchRepository natureJuridiqueSearchRepository;

    public NatureJuridiqueResource(NatureJuridiqueRepository natureJuridiqueRepository, NatureJuridiqueSearchRepository natureJuridiqueSearchRepository) {
        this.natureJuridiqueRepository = natureJuridiqueRepository;
        this.natureJuridiqueSearchRepository = natureJuridiqueSearchRepository;
    }

    /**
     * {@code POST  /nature-juridiques} : Create a new natureJuridique.
     *
     * @param natureJuridique the natureJuridique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new natureJuridique, or with status {@code 400 (Bad Request)} if the natureJuridique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nature-juridiques")
    public ResponseEntity<NatureJuridique> createNatureJuridique(@Valid @RequestBody NatureJuridique natureJuridique) throws URISyntaxException {
        log.debug("REST request to save NatureJuridique : {}", natureJuridique);
        if (natureJuridique.getId() != null) {
            throw new BadRequestAlertException("A new natureJuridique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NatureJuridique result = natureJuridiqueRepository.save(natureJuridique);
        natureJuridiqueSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/nature-juridiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nature-juridiques} : Updates an existing natureJuridique.
     *
     * @param natureJuridique the natureJuridique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated natureJuridique,
     * or with status {@code 400 (Bad Request)} if the natureJuridique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the natureJuridique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nature-juridiques")
    public ResponseEntity<NatureJuridique> updateNatureJuridique(@Valid @RequestBody NatureJuridique natureJuridique) throws URISyntaxException {
        log.debug("REST request to update NatureJuridique : {}", natureJuridique);
        if (natureJuridique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NatureJuridique result = natureJuridiqueRepository.save(natureJuridique);
        natureJuridiqueSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, natureJuridique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nature-juridiques} : get all the natureJuridiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of natureJuridiques in body.
     */
    @GetMapping("/nature-juridiques")
    public List<NatureJuridique> getAllNatureJuridiques() {
        log.debug("REST request to get all NatureJuridiques");
        return natureJuridiqueRepository.findAll();
    }

    /**
     * {@code GET  /nature-juridiques/:id} : get the "id" natureJuridique.
     *
     * @param id the id of the natureJuridique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the natureJuridique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nature-juridiques/{id}")
    public ResponseEntity<NatureJuridique> getNatureJuridique(@PathVariable Long id) {
        log.debug("REST request to get NatureJuridique : {}", id);
        Optional<NatureJuridique> natureJuridique = natureJuridiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(natureJuridique);
    }

    /**
     * {@code DELETE  /nature-juridiques/:id} : delete the "id" natureJuridique.
     *
     * @param id the id of the natureJuridique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nature-juridiques/{id}")
    public ResponseEntity<Void> deleteNatureJuridique(@PathVariable Long id) {
        log.debug("REST request to delete NatureJuridique : {}", id);
        natureJuridiqueRepository.deleteById(id);
        natureJuridiqueSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/nature-juridiques?query=:query} : search for the natureJuridique corresponding
     * to the query.
     *
     * @param query the query of the natureJuridique search.
     * @return the result of the search.
     */
    @GetMapping("/_search/nature-juridiques")
    public List<NatureJuridique> searchNatureJuridiques(@RequestParam String query) {
        log.debug("REST request to search NatureJuridiques for query {}", query);
        return StreamSupport
            .stream(natureJuridiqueSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
