package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.TypeStructure;
import orgarif.repository.TypeStructureRepository;
import orgarif.repository.search.TypeStructureSearchRepository;
import orgarif.service.AuditTrailService;
import orgarif.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
 * Integration tests for the {@link TypeStructureResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
public class TypeStructureResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private TypeStructureRepository typeStructureRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.TypeStructureSearchRepositoryMockConfiguration
     */
    @Autowired
    private TypeStructureSearchRepository mockTypeStructureSearchRepository;

    @Autowired
    private AuditTrailService auditTrailService;

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

    private MockMvc restTypeStructureMockMvc;

    private TypeStructure typeStructure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeStructureResource typeStructureResource = new TypeStructureResource(typeStructureRepository, mockTypeStructureSearchRepository, auditTrailService);
        this.restTypeStructureMockMvc = MockMvcBuilders.standaloneSetup(typeStructureResource)
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
    public static TypeStructure createEntity(EntityManager em) {
        TypeStructure typeStructure = new TypeStructure()
            .label(DEFAULT_LABEL);
        return typeStructure;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeStructure createUpdatedEntity(EntityManager em) {
        TypeStructure typeStructure = new TypeStructure()
            .label(UPDATED_LABEL);
        return typeStructure;
    }

    @BeforeEach
    public void initTest() {
        typeStructure = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeStructure() throws Exception {
        int databaseSizeBeforeCreate = typeStructureRepository.findAll().size();

        // Create the TypeStructure
        restTypeStructureMockMvc.perform(post("/api/type-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeStructure)))
            .andExpect(status().isCreated());

        // Validate the TypeStructure in the database
        List<TypeStructure> typeStructureList = typeStructureRepository.findAll();
        assertThat(typeStructureList).hasSize(databaseSizeBeforeCreate + 1);
        TypeStructure testTypeStructure = typeStructureList.get(typeStructureList.size() - 1);
        assertThat(testTypeStructure.getLabel()).isEqualTo(DEFAULT_LABEL);

        // Validate the TypeStructure in Elasticsearch
        verify(mockTypeStructureSearchRepository, times(1)).save(testTypeStructure);
    }

    @Test
    @Transactional
    public void createTypeStructureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeStructureRepository.findAll().size();

        // Create the TypeStructure with an existing ID
        typeStructure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeStructureMockMvc.perform(post("/api/type-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeStructure)))
            .andExpect(status().isBadRequest());

        // Validate the TypeStructure in the database
        List<TypeStructure> typeStructureList = typeStructureRepository.findAll();
        assertThat(typeStructureList).hasSize(databaseSizeBeforeCreate);

        // Validate the TypeStructure in Elasticsearch
        verify(mockTypeStructureSearchRepository, times(0)).save(typeStructure);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeStructureRepository.findAll().size();
        // set the field null
        typeStructure.setLabel(null);

        // Create the TypeStructure, which fails.

        restTypeStructureMockMvc.perform(post("/api/type-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeStructure)))
            .andExpect(status().isBadRequest());

        List<TypeStructure> typeStructureList = typeStructureRepository.findAll();
        assertThat(typeStructureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeStructures() throws Exception {
        // Initialize the database
        typeStructureRepository.saveAndFlush(typeStructure);

        // Get all the typeStructureList
        restTypeStructureMockMvc.perform(get("/api/type-structures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeStructure.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }

    @Test
    @Transactional
    public void getTypeStructure() throws Exception {
        // Initialize the database
        typeStructureRepository.saveAndFlush(typeStructure);

        // Get the typeStructure
        restTypeStructureMockMvc.perform(get("/api/type-structures/{id}", typeStructure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeStructure.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }

    @Test
    @Transactional
    public void getNonExistingTypeStructure() throws Exception {
        // Get the typeStructure
        restTypeStructureMockMvc.perform(get("/api/type-structures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeStructure() throws Exception {
        // Initialize the database
        typeStructureRepository.saveAndFlush(typeStructure);

        int databaseSizeBeforeUpdate = typeStructureRepository.findAll().size();

        // Update the typeStructure
        TypeStructure updatedTypeStructure = typeStructureRepository.findById(typeStructure.getId()).get();
        // Disconnect from session so that the updates on updatedTypeStructure are not directly saved in db
        em.detach(updatedTypeStructure);
        updatedTypeStructure
            .label(UPDATED_LABEL);

        restTypeStructureMockMvc.perform(put("/api/type-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeStructure)))
            .andExpect(status().isOk());

        // Validate the TypeStructure in the database
        List<TypeStructure> typeStructureList = typeStructureRepository.findAll();
        assertThat(typeStructureList).hasSize(databaseSizeBeforeUpdate);
        TypeStructure testTypeStructure = typeStructureList.get(typeStructureList.size() - 1);
        assertThat(testTypeStructure.getLabel()).isEqualTo(UPDATED_LABEL);

        // Validate the TypeStructure in Elasticsearch
        verify(mockTypeStructureSearchRepository, times(1)).save(testTypeStructure);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeStructure() throws Exception {
        int databaseSizeBeforeUpdate = typeStructureRepository.findAll().size();

        // Create the TypeStructure

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeStructureMockMvc.perform(put("/api/type-structures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeStructure)))
            .andExpect(status().isBadRequest());

        // Validate the TypeStructure in the database
        List<TypeStructure> typeStructureList = typeStructureRepository.findAll();
        assertThat(typeStructureList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TypeStructure in Elasticsearch
        verify(mockTypeStructureSearchRepository, times(0)).save(typeStructure);
    }

    @Test
    @Transactional
    public void deleteTypeStructure() throws Exception {
        // Initialize the database
        typeStructureRepository.saveAndFlush(typeStructure);

        int databaseSizeBeforeDelete = typeStructureRepository.findAll().size();

        // Delete the typeStructure
        restTypeStructureMockMvc.perform(delete("/api/type-structures/{id}", typeStructure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeStructure> typeStructureList = typeStructureRepository.findAll();
        assertThat(typeStructureList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TypeStructure in Elasticsearch
        verify(mockTypeStructureSearchRepository, times(1)).deleteById(typeStructure.getId());
    }

    @Test
    @Transactional
    public void searchTypeStructure() throws Exception {
        // Initialize the database
        typeStructureRepository.saveAndFlush(typeStructure);
        when(mockTypeStructureSearchRepository.search(queryStringQuery("id:" + typeStructure.getId())))
            .thenReturn(Collections.singletonList(typeStructure));
        // Search the typeStructure
        restTypeStructureMockMvc.perform(get("/api/_search/type-structures?query=id:" + typeStructure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeStructure.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeStructure.class);
        TypeStructure typeStructure1 = new TypeStructure();
        typeStructure1.setId(1L);
        TypeStructure typeStructure2 = new TypeStructure();
        typeStructure2.setId(typeStructure1.getId());
        assertThat(typeStructure1).isEqualTo(typeStructure2);
        typeStructure2.setId(2L);
        assertThat(typeStructure1).isNotEqualTo(typeStructure2);
        typeStructure1.setId(null);
        assertThat(typeStructure1).isNotEqualTo(typeStructure2);
    }
}
