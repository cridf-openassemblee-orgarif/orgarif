package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.AuditTrail;
import orgarif.repository.AuditTrailRepository;
import orgarif.repository.search.AuditTrailSearchRepository;
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

import orgarif.domain.enumeration.AuditTrailAction;
/**
 * Integration tests for the {@link AuditTrailResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
public class AuditTrailResourceIT {

    private static final String DEFAULT_ENTITY = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY = "BBBBBBBBBB";

    private static final Long DEFAULT_ENTITY_ID = 1L;
    private static final Long UPDATED_ENTITY_ID = 2L;

    private static final String DEFAULT_PARENT_ENTITY = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_ENTITY = "BBBBBBBBBB";

    private static final Long DEFAULT_PARENT_ENTITY_ID = 1L;
    private static final Long UPDATED_PARENT_ENTITY_ID = 2L;

    private static final AuditTrailAction DEFAULT_ACTION = AuditTrailAction.CREATE;
    private static final AuditTrailAction UPDATED_ACTION = AuditTrailAction.UPDATE;

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    @Autowired
    private AuditTrailRepository auditTrailRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.AuditTrailSearchRepositoryMockConfiguration
     */
    @Autowired
    private AuditTrailSearchRepository mockAuditTrailSearchRepository;

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

    private MockMvc restAuditTrailMockMvc;

    private AuditTrail auditTrail;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuditTrailResource auditTrailResource = new AuditTrailResource(auditTrailRepository, mockAuditTrailSearchRepository);
        this.restAuditTrailMockMvc = MockMvcBuilders.standaloneSetup(auditTrailResource)
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
    public static AuditTrail createEntity(EntityManager em) {
        AuditTrail auditTrail = new AuditTrail();
        auditTrail.setEntity(DEFAULT_ENTITY);
        auditTrail.setEntityId(DEFAULT_ENTITY_ID);
        auditTrail.setParentEntity(DEFAULT_PARENT_ENTITY);
        auditTrail.setParentEntityId(DEFAULT_PARENT_ENTITY_ID);
        auditTrail.setAction(DEFAULT_ACTION);
        auditTrail.setUser(DEFAULT_USER);
        auditTrail.setDate(DEFAULT_DATE);
        auditTrail.setDetails(DEFAULT_DETAILS);
        auditTrail.setReason(DEFAULT_REASON);
        return auditTrail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuditTrail createUpdatedEntity(EntityManager em) {
        AuditTrail auditTrail = new AuditTrail();
        auditTrail.setEntity(UPDATED_ENTITY);
        auditTrail.setEntityId(UPDATED_ENTITY_ID);
        auditTrail.setParentEntity(UPDATED_PARENT_ENTITY);
        auditTrail.setParentEntityId(UPDATED_PARENT_ENTITY_ID);
        auditTrail.setAction(UPDATED_ACTION);
        auditTrail.setUser(UPDATED_USER);
        auditTrail.setDate(UPDATED_DATE);
        auditTrail.setDetails(UPDATED_DETAILS);
        auditTrail.setReason(UPDATED_REASON);
        return auditTrail;
    }

    @BeforeEach
    public void initTest() {
        auditTrail = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuditTrail() throws Exception {
        int databaseSizeBeforeCreate = auditTrailRepository.findAll().size();

        // Create the AuditTrail
        restAuditTrailMockMvc.perform(post("/api/audit-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditTrail)))
            .andExpect(status().isCreated());

        // Validate the AuditTrail in the database
        List<AuditTrail> auditTrailList = auditTrailRepository.findAll();
        assertThat(auditTrailList).hasSize(databaseSizeBeforeCreate + 1);
        AuditTrail testAuditTrail = auditTrailList.get(auditTrailList.size() - 1);
        assertThat(testAuditTrail.getEntity()).isEqualTo(DEFAULT_ENTITY);
        assertThat(testAuditTrail.getEntityId()).isEqualTo(DEFAULT_ENTITY_ID);
        assertThat(testAuditTrail.getParentEntity()).isEqualTo(DEFAULT_PARENT_ENTITY);
        assertThat(testAuditTrail.getParentEntityId()).isEqualTo(DEFAULT_PARENT_ENTITY_ID);
        assertThat(testAuditTrail.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testAuditTrail.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testAuditTrail.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testAuditTrail.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testAuditTrail.getReason()).isEqualTo(DEFAULT_REASON);

        // Validate the AuditTrail in Elasticsearch
        verify(mockAuditTrailSearchRepository, times(1)).save(testAuditTrail);
    }

    @Test
    @Transactional
    public void createAuditTrailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auditTrailRepository.findAll().size();

        // Create the AuditTrail with an existing ID
        auditTrail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuditTrailMockMvc.perform(post("/api/audit-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditTrail)))
            .andExpect(status().isBadRequest());

        // Validate the AuditTrail in the database
        List<AuditTrail> auditTrailList = auditTrailRepository.findAll();
        assertThat(auditTrailList).hasSize(databaseSizeBeforeCreate);

        // Validate the AuditTrail in Elasticsearch
        verify(mockAuditTrailSearchRepository, times(0)).save(auditTrail);
    }


    @Test
    @Transactional
    public void getAllAuditTrails() throws Exception {
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);

        // Get all the auditTrailList
        restAuditTrailMockMvc.perform(get("/api/audit-trails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auditTrail.getId().intValue())))
            .andExpect(jsonPath("$.[*].entity").value(hasItem(DEFAULT_ENTITY)))
            .andExpect(jsonPath("$.[*].entityId").value(hasItem(DEFAULT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].parentEntity").value(hasItem(DEFAULT_PARENT_ENTITY)))
            .andExpect(jsonPath("$.[*].parentEntityId").value(hasItem(DEFAULT_PARENT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)));
    }
    
    @Test
    @Transactional
    public void getAuditTrail() throws Exception {
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);

        // Get the auditTrail
        restAuditTrailMockMvc.perform(get("/api/audit-trails/{id}", auditTrail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(auditTrail.getId().intValue()))
            .andExpect(jsonPath("$.entity").value(DEFAULT_ENTITY))
            .andExpect(jsonPath("$.entityId").value(DEFAULT_ENTITY_ID.intValue()))
            .andExpect(jsonPath("$.parentEntity").value(DEFAULT_PARENT_ENTITY))
            .andExpect(jsonPath("$.parentEntityId").value(DEFAULT_PARENT_ENTITY_ID.intValue()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON));
    }

    @Test
    @Transactional
    public void getNonExistingAuditTrail() throws Exception {
        // Get the auditTrail
        restAuditTrailMockMvc.perform(get("/api/audit-trails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuditTrail() throws Exception {
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);

        int databaseSizeBeforeUpdate = auditTrailRepository.findAll().size();

        // Update the auditTrail
        AuditTrail updatedAuditTrail = auditTrailRepository.findById(auditTrail.getId()).get();
        // Disconnect from session so that the updates on updatedAuditTrail are not directly saved in db
        em.detach(updatedAuditTrail);
        updatedAuditTrail.setEntity(UPDATED_ENTITY);
        updatedAuditTrail.setEntityId(UPDATED_ENTITY_ID);
        updatedAuditTrail.setParentEntity(UPDATED_PARENT_ENTITY);
        updatedAuditTrail.setParentEntityId(UPDATED_PARENT_ENTITY_ID);
        updatedAuditTrail.setAction(UPDATED_ACTION);
        updatedAuditTrail.setUser(UPDATED_USER);
        updatedAuditTrail.setDate(UPDATED_DATE);
        updatedAuditTrail.setDetails(UPDATED_DETAILS);
        updatedAuditTrail.setReason(UPDATED_REASON);

        restAuditTrailMockMvc.perform(put("/api/audit-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuditTrail)))
            .andExpect(status().isOk());

        // Validate the AuditTrail in the database
        List<AuditTrail> auditTrailList = auditTrailRepository.findAll();
        assertThat(auditTrailList).hasSize(databaseSizeBeforeUpdate);
        AuditTrail testAuditTrail = auditTrailList.get(auditTrailList.size() - 1);
        assertThat(testAuditTrail.getEntity()).isEqualTo(UPDATED_ENTITY);
        assertThat(testAuditTrail.getEntityId()).isEqualTo(UPDATED_ENTITY_ID);
        assertThat(testAuditTrail.getParentEntity()).isEqualTo(UPDATED_PARENT_ENTITY);
        assertThat(testAuditTrail.getParentEntityId()).isEqualTo(UPDATED_PARENT_ENTITY_ID);
        assertThat(testAuditTrail.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testAuditTrail.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testAuditTrail.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testAuditTrail.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testAuditTrail.getReason()).isEqualTo(UPDATED_REASON);

        // Validate the AuditTrail in Elasticsearch
        verify(mockAuditTrailSearchRepository, times(1)).save(testAuditTrail);
    }

    @Test
    @Transactional
    public void updateNonExistingAuditTrail() throws Exception {
        int databaseSizeBeforeUpdate = auditTrailRepository.findAll().size();

        // Create the AuditTrail

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuditTrailMockMvc.perform(put("/api/audit-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditTrail)))
            .andExpect(status().isBadRequest());

        // Validate the AuditTrail in the database
        List<AuditTrail> auditTrailList = auditTrailRepository.findAll();
        assertThat(auditTrailList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AuditTrail in Elasticsearch
        verify(mockAuditTrailSearchRepository, times(0)).save(auditTrail);
    }

    @Test
    @Transactional
    public void deleteAuditTrail() throws Exception {
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);

        int databaseSizeBeforeDelete = auditTrailRepository.findAll().size();

        // Delete the auditTrail
        restAuditTrailMockMvc.perform(delete("/api/audit-trails/{id}", auditTrail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AuditTrail> auditTrailList = auditTrailRepository.findAll();
        assertThat(auditTrailList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AuditTrail in Elasticsearch
        verify(mockAuditTrailSearchRepository, times(1)).deleteById(auditTrail.getId());
    }

    @Test
    @Transactional
    public void searchAuditTrail() throws Exception {
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);
        when(mockAuditTrailSearchRepository.search(queryStringQuery("id:" + auditTrail.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(auditTrail), PageRequest.of(0, 1), 1));
        // Search the auditTrail
        restAuditTrailMockMvc.perform(get("/api/_search/audit-trails?query=id:" + auditTrail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auditTrail.getId().intValue())))
            .andExpect(jsonPath("$.[*].entity").value(hasItem(DEFAULT_ENTITY)))
            .andExpect(jsonPath("$.[*].entityId").value(hasItem(DEFAULT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].parentEntity").value(hasItem(DEFAULT_PARENT_ENTITY)))
            .andExpect(jsonPath("$.[*].parentEntityId").value(hasItem(DEFAULT_PARENT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuditTrail.class);
        AuditTrail auditTrail1 = new AuditTrail();
        auditTrail1.setId(1L);
        AuditTrail auditTrail2 = new AuditTrail();
        auditTrail2.setId(auditTrail1.getId());
        assertThat(auditTrail1).isEqualTo(auditTrail2);
        auditTrail2.setId(2L);
        assertThat(auditTrail1).isNotEqualTo(auditTrail2);
        auditTrail1.setId(null);
        assertThat(auditTrail1).isNotEqualTo(auditTrail2);
    }
}
