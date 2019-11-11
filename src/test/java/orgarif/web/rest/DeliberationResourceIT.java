package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.Deliberation;
import orgarif.repository.DeliberationRepository;
import orgarif.repository.search.DeliberationSearchRepository;
import orgarif.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static orgarif.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DeliberationResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
public class DeliberationResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DeliberationRepository deliberationRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.DeliberationSearchRepositoryMockConfiguration
     */
    @Autowired
    private DeliberationSearchRepository mockDeliberationSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDeliberationMockMvc;

    private Deliberation deliberation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliberationResource deliberationResource = new DeliberationResource(deliberationRepository, mockDeliberationSearchRepository);
        this.restDeliberationMockMvc = MockMvcBuilders.standaloneSetup(deliberationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deliberation createEntity(EntityManager em) {
        Deliberation deliberation = new Deliberation()
            .label(DEFAULT_LABEL)
            .date(DEFAULT_DATE)
            .creationDate(DEFAULT_CREATION_DATE);
        return deliberation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deliberation createUpdatedEntity(EntityManager em) {
        Deliberation deliberation = new Deliberation()
            .label(UPDATED_LABEL)
            .date(UPDATED_DATE)
            .creationDate(UPDATED_CREATION_DATE);
        return deliberation;
    }

    @BeforeEach
    public void initTest() {
        deliberation = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliberation() throws Exception {
        int databaseSizeBeforeCreate = deliberationRepository.findAll().size();

        // Create the Deliberation
        restDeliberationMockMvc.perform(post("/api/deliberations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliberation)))
            .andExpect(status().isCreated());

        // Validate the Deliberation in the database
        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeCreate + 1);
        Deliberation testDeliberation = deliberationList.get(deliberationList.size() - 1);
        assertThat(testDeliberation.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testDeliberation.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testDeliberation.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);

        // Validate the Deliberation in Elasticsearch
        verify(mockDeliberationSearchRepository, times(1)).save(testDeliberation);
    }

    @Test
    @Transactional
    public void createDeliberationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliberationRepository.findAll().size();

        // Create the Deliberation with an existing ID
        deliberation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliberationMockMvc.perform(post("/api/deliberations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliberation)))
            .andExpect(status().isBadRequest());

        // Validate the Deliberation in the database
        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeCreate);

        // Validate the Deliberation in Elasticsearch
        verify(mockDeliberationSearchRepository, times(0)).save(deliberation);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliberationRepository.findAll().size();
        // set the field null
        deliberation.setLabel(null);

        // Create the Deliberation, which fails.

        restDeliberationMockMvc.perform(post("/api/deliberations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliberation)))
            .andExpect(status().isBadRequest());

        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliberationRepository.findAll().size();
        // set the field null
        deliberation.setDate(null);

        // Create the Deliberation, which fails.

        restDeliberationMockMvc.perform(post("/api/deliberations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliberation)))
            .andExpect(status().isBadRequest());

        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDeliberations() throws Exception {
        // Initialize the database
        deliberationRepository.saveAndFlush(deliberation);

        // Get all the deliberationList
        restDeliberationMockMvc.perform(get("/api/deliberations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliberation.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getDeliberation() throws Exception {
        // Initialize the database
        deliberationRepository.saveAndFlush(deliberation);

        // Get the deliberation
        restDeliberationMockMvc.perform(get("/api/deliberations/{id}", deliberation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliberation.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliberation() throws Exception {
        // Get the deliberation
        restDeliberationMockMvc.perform(get("/api/deliberations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliberation() throws Exception {
        // Initialize the database
        deliberationRepository.saveAndFlush(deliberation);

        int databaseSizeBeforeUpdate = deliberationRepository.findAll().size();

        // Update the deliberation
        Deliberation updatedDeliberation = deliberationRepository.findById(deliberation.getId()).get();
        // Disconnect from session so that the updates on updatedDeliberation are not directly saved in db
        em.detach(updatedDeliberation);
        updatedDeliberation
            .label(UPDATED_LABEL)
            .date(UPDATED_DATE)
            .creationDate(UPDATED_CREATION_DATE);

        restDeliberationMockMvc.perform(put("/api/deliberations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliberation)))
            .andExpect(status().isOk());

        // Validate the Deliberation in the database
        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeUpdate);
        Deliberation testDeliberation = deliberationList.get(deliberationList.size() - 1);
        assertThat(testDeliberation.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testDeliberation.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testDeliberation.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);

        // Validate the Deliberation in Elasticsearch
        verify(mockDeliberationSearchRepository, times(1)).save(testDeliberation);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliberation() throws Exception {
        int databaseSizeBeforeUpdate = deliberationRepository.findAll().size();

        // Create the Deliberation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliberationMockMvc.perform(put("/api/deliberations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliberation)))
            .andExpect(status().isBadRequest());

        // Validate the Deliberation in the database
        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Deliberation in Elasticsearch
        verify(mockDeliberationSearchRepository, times(0)).save(deliberation);
    }

    @Test
    @Transactional
    public void deleteDeliberation() throws Exception {
        // Initialize the database
        deliberationRepository.saveAndFlush(deliberation);

        int databaseSizeBeforeDelete = deliberationRepository.findAll().size();

        // Delete the deliberation
        restDeliberationMockMvc.perform(delete("/api/deliberations/{id}", deliberation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Deliberation> deliberationList = deliberationRepository.findAll();
        assertThat(deliberationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Deliberation in Elasticsearch
        verify(mockDeliberationSearchRepository, times(1)).deleteById(deliberation.getId());
    }

    @Test
    @Transactional
    public void searchDeliberation() throws Exception {
        // Initialize the database
        deliberationRepository.saveAndFlush(deliberation);
        when(mockDeliberationSearchRepository.search(queryStringQuery("id:" + deliberation.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(deliberation), PageRequest.of(0, 1), 1));
        // Search the deliberation
        restDeliberationMockMvc.perform(get("/api/_search/deliberations?query=id:" + deliberation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliberation.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deliberation.class);
        Deliberation deliberation1 = new Deliberation();
        deliberation1.setId(1L);
        Deliberation deliberation2 = new Deliberation();
        deliberation2.setId(deliberation1.getId());
        assertThat(deliberation1).isEqualTo(deliberation2);
        deliberation2.setId(2L);
        assertThat(deliberation1).isNotEqualTo(deliberation2);
        deliberation1.setId(null);
        assertThat(deliberation1).isNotEqualTo(deliberation2);
    }
}
