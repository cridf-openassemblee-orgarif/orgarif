package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.AuditTrail;
import orgarif.repository.AuditTrailRepository;
import orgarif.repository.search.AuditTrailSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import orgarif.domain.enumeration.AuditTrailAction;
/**
 * Integration tests for the {@link AuditTrailResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
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

    private static final String DEFAULT_UPDATE_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_DESCRIPTION = "BBBBBBBBBB";

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
    private EntityManager em;

    @Autowired
    private MockMvc restAuditTrailMockMvc;

    private AuditTrail auditTrail;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuditTrail createEntity(EntityManager em) {
        AuditTrail auditTrail = new AuditTrail()
            .entity(DEFAULT_ENTITY)
            .entityId(DEFAULT_ENTITY_ID)
            .parentEntity(DEFAULT_PARENT_ENTITY)
            .parentEntityId(DEFAULT_PARENT_ENTITY_ID)
            .action(DEFAULT_ACTION)
            .user(DEFAULT_USER)
            .date(DEFAULT_DATE)
            .details(DEFAULT_DETAILS)
            .updateDescription(DEFAULT_UPDATE_DESCRIPTION);
        return auditTrail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuditTrail createUpdatedEntity(EntityManager em) {
        AuditTrail auditTrail = new AuditTrail()
            .entity(UPDATED_ENTITY)
            .entityId(UPDATED_ENTITY_ID)
            .parentEntity(UPDATED_PARENT_ENTITY)
            .parentEntityId(UPDATED_PARENT_ENTITY_ID)
            .action(UPDATED_ACTION)
            .user(UPDATED_USER)
            .date(UPDATED_DATE)
            .details(UPDATED_DETAILS)
            .updateDescription(UPDATED_UPDATE_DESCRIPTION);
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
        restAuditTrailMockMvc.perform(post("/api/audit-trails").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
        assertThat(testAuditTrail.getUpdateDescription()).isEqualTo(DEFAULT_UPDATE_DESCRIPTION);

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
        restAuditTrailMockMvc.perform(post("/api/audit-trails").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auditTrail.getId().intValue())))
            .andExpect(jsonPath("$.[*].entity").value(hasItem(DEFAULT_ENTITY)))
            .andExpect(jsonPath("$.[*].entityId").value(hasItem(DEFAULT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].parentEntity").value(hasItem(DEFAULT_PARENT_ENTITY)))
            .andExpect(jsonPath("$.[*].parentEntityId").value(hasItem(DEFAULT_PARENT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)))
            .andExpect(jsonPath("$.[*].updateDescription").value(hasItem(DEFAULT_UPDATE_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getAuditTrail() throws Exception {
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);

        // Get the auditTrail
        restAuditTrailMockMvc.perform(get("/api/audit-trails/{id}", auditTrail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(auditTrail.getId().intValue()))
            .andExpect(jsonPath("$.entity").value(DEFAULT_ENTITY))
            .andExpect(jsonPath("$.entityId").value(DEFAULT_ENTITY_ID.intValue()))
            .andExpect(jsonPath("$.parentEntity").value(DEFAULT_PARENT_ENTITY))
            .andExpect(jsonPath("$.parentEntityId").value(DEFAULT_PARENT_ENTITY_ID.intValue()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS))
            .andExpect(jsonPath("$.updateDescription").value(DEFAULT_UPDATE_DESCRIPTION));
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
        updatedAuditTrail
            .entity(UPDATED_ENTITY)
            .entityId(UPDATED_ENTITY_ID)
            .parentEntity(UPDATED_PARENT_ENTITY)
            .parentEntityId(UPDATED_PARENT_ENTITY_ID)
            .action(UPDATED_ACTION)
            .user(UPDATED_USER)
            .date(UPDATED_DATE)
            .details(UPDATED_DETAILS)
            .updateDescription(UPDATED_UPDATE_DESCRIPTION);

        restAuditTrailMockMvc.perform(put("/api/audit-trails").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
        assertThat(testAuditTrail.getUpdateDescription()).isEqualTo(UPDATED_UPDATE_DESCRIPTION);

        // Validate the AuditTrail in Elasticsearch
        verify(mockAuditTrailSearchRepository, times(1)).save(testAuditTrail);
    }

    @Test
    @Transactional
    public void updateNonExistingAuditTrail() throws Exception {
        int databaseSizeBeforeUpdate = auditTrailRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuditTrailMockMvc.perform(put("/api/audit-trails").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
        restAuditTrailMockMvc.perform(delete("/api/audit-trails/{id}", auditTrail.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
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
        // Configure the mock search repository
        // Initialize the database
        auditTrailRepository.saveAndFlush(auditTrail);
        when(mockAuditTrailSearchRepository.search(queryStringQuery("id:" + auditTrail.getId())))
            .thenReturn(Collections.singletonList(auditTrail));

        // Search the auditTrail
        restAuditTrailMockMvc.perform(get("/api/_search/audit-trails?query=id:" + auditTrail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auditTrail.getId().intValue())))
            .andExpect(jsonPath("$.[*].entity").value(hasItem(DEFAULT_ENTITY)))
            .andExpect(jsonPath("$.[*].entityId").value(hasItem(DEFAULT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].parentEntity").value(hasItem(DEFAULT_PARENT_ENTITY)))
            .andExpect(jsonPath("$.[*].parentEntityId").value(hasItem(DEFAULT_PARENT_ENTITY_ID.intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)))
            .andExpect(jsonPath("$.[*].updateDescription").value(hasItem(DEFAULT_UPDATE_DESCRIPTION)));
    }
}
