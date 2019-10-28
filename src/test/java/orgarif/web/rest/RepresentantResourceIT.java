package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.Representant;
import orgarif.domain.Elu;
import orgarif.repository.RepresentantRepository;
import orgarif.repository.search.RepresentantSearchRepository;
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
 * Integration tests for the {@link RepresentantResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
public class RepresentantResourceIT {

    private static final Integer DEFAULT_POSITION = 1;
    private static final Integer UPDATED_POSITION = 2;

    @Autowired
    private RepresentantRepository representantRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.RepresentantSearchRepositoryMockConfiguration
     */
    @Autowired
    private RepresentantSearchRepository mockRepresentantSearchRepository;

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

    private MockMvc restRepresentantMockMvc;

    private Representant representant;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepresentantResource representantResource = new RepresentantResource(representantRepository, mockRepresentantSearchRepository);
        this.restRepresentantMockMvc = MockMvcBuilders.standaloneSetup(representantResource)
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
    public static Representant createEntity(EntityManager em) {
        Representant representant = new Representant()
            .position(DEFAULT_POSITION);
        // Add required entity
        Elu elu;
        if (TestUtil.findAll(em, Elu.class).isEmpty()) {
            elu = EluResourceIT.createEntity(em);
            em.persist(elu);
            em.flush();
        } else {
            elu = TestUtil.findAll(em, Elu.class).get(0);
        }
        representant.setElu(elu);
        return representant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Representant createUpdatedEntity(EntityManager em) {
        Representant representant = new Representant()
            .position(UPDATED_POSITION);
        // Add required entity
        Elu elu;
        if (TestUtil.findAll(em, Elu.class).isEmpty()) {
            elu = EluResourceIT.createUpdatedEntity(em);
            em.persist(elu);
            em.flush();
        } else {
            elu = TestUtil.findAll(em, Elu.class).get(0);
        }
        representant.setElu(elu);
        return representant;
    }

    @BeforeEach
    public void initTest() {
        representant = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepresentant() throws Exception {
        int databaseSizeBeforeCreate = representantRepository.findAll().size();

        // Create the Representant
        restRepresentantMockMvc.perform(post("/api/representants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representant)))
            .andExpect(status().isCreated());

        // Validate the Representant in the database
        List<Representant> representantList = representantRepository.findAll();
        assertThat(representantList).hasSize(databaseSizeBeforeCreate + 1);
        Representant testRepresentant = representantList.get(representantList.size() - 1);
        assertThat(testRepresentant.getPosition()).isEqualTo(DEFAULT_POSITION);

        // Validate the Representant in Elasticsearch
        verify(mockRepresentantSearchRepository, times(1)).save(testRepresentant);
    }

    @Test
    @Transactional
    public void createRepresentantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = representantRepository.findAll().size();

        // Create the Representant with an existing ID
        representant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepresentantMockMvc.perform(post("/api/representants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representant)))
            .andExpect(status().isBadRequest());

        // Validate the Representant in the database
        List<Representant> representantList = representantRepository.findAll();
        assertThat(representantList).hasSize(databaseSizeBeforeCreate);

        // Validate the Representant in Elasticsearch
        verify(mockRepresentantSearchRepository, times(0)).save(representant);
    }


    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = representantRepository.findAll().size();
        // set the field null
        representant.setPosition(null);

        // Create the Representant, which fails.

        restRepresentantMockMvc.perform(post("/api/representants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representant)))
            .andExpect(status().isBadRequest());

        List<Representant> representantList = representantRepository.findAll();
        assertThat(representantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRepresentants() throws Exception {
        // Initialize the database
        representantRepository.saveAndFlush(representant);

        // Get all the representantList
        restRepresentantMockMvc.perform(get("/api/representants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(representant.getId().intValue())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)));
    }
    
    @Test
    @Transactional
    public void getRepresentant() throws Exception {
        // Initialize the database
        representantRepository.saveAndFlush(representant);

        // Get the representant
        restRepresentantMockMvc.perform(get("/api/representants/{id}", representant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(representant.getId().intValue()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION));
    }

    @Test
    @Transactional
    public void getNonExistingRepresentant() throws Exception {
        // Get the representant
        restRepresentantMockMvc.perform(get("/api/representants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepresentant() throws Exception {
        // Initialize the database
        representantRepository.saveAndFlush(representant);

        int databaseSizeBeforeUpdate = representantRepository.findAll().size();

        // Update the representant
        Representant updatedRepresentant = representantRepository.findById(representant.getId()).get();
        // Disconnect from session so that the updates on updatedRepresentant are not directly saved in db
        em.detach(updatedRepresentant);
        updatedRepresentant
            .position(UPDATED_POSITION);

        restRepresentantMockMvc.perform(put("/api/representants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepresentant)))
            .andExpect(status().isOk());

        // Validate the Representant in the database
        List<Representant> representantList = representantRepository.findAll();
        assertThat(representantList).hasSize(databaseSizeBeforeUpdate);
        Representant testRepresentant = representantList.get(representantList.size() - 1);
        assertThat(testRepresentant.getPosition()).isEqualTo(UPDATED_POSITION);

        // Validate the Representant in Elasticsearch
        verify(mockRepresentantSearchRepository, times(1)).save(testRepresentant);
    }

    @Test
    @Transactional
    public void updateNonExistingRepresentant() throws Exception {
        int databaseSizeBeforeUpdate = representantRepository.findAll().size();

        // Create the Representant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepresentantMockMvc.perform(put("/api/representants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representant)))
            .andExpect(status().isBadRequest());

        // Validate the Representant in the database
        List<Representant> representantList = representantRepository.findAll();
        assertThat(representantList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Representant in Elasticsearch
        verify(mockRepresentantSearchRepository, times(0)).save(representant);
    }

    @Test
    @Transactional
    public void deleteRepresentant() throws Exception {
        // Initialize the database
        representantRepository.saveAndFlush(representant);

        int databaseSizeBeforeDelete = representantRepository.findAll().size();

        // Delete the representant
        restRepresentantMockMvc.perform(delete("/api/representants/{id}", representant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Representant> representantList = representantRepository.findAll();
        assertThat(representantList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Representant in Elasticsearch
        verify(mockRepresentantSearchRepository, times(1)).deleteById(representant.getId());
    }

    @Test
    @Transactional
    public void searchRepresentant() throws Exception {
        // Initialize the database
        representantRepository.saveAndFlush(representant);
        when(mockRepresentantSearchRepository.search(queryStringQuery("id:" + representant.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(representant), PageRequest.of(0, 1), 1));
        // Search the representant
        restRepresentantMockMvc.perform(get("/api/_search/representants?query=id:" + representant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(representant.getId().intValue())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Representant.class);
        Representant representant1 = new Representant();
        representant1.setId(1L);
        Representant representant2 = new Representant();
        representant2.setId(representant1.getId());
        assertThat(representant1).isEqualTo(representant2);
        representant2.setId(2L);
        assertThat(representant1).isNotEqualTo(representant2);
        representant1.setId(null);
        assertThat(representant1).isNotEqualTo(representant2);
    }
}
