package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.Elu;
import orgarif.repository.EluRepository;
import orgarif.repository.search.EluSearchRepository;

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
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import orgarif.domain.enumeration.Civilite;
/**
 * Integration tests for the {@link EluResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class EluResourceIT {

    private static final String DEFAULT_SOURCE_ID = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_UID = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_UID = "BBBBBBBBBB";

    private static final Civilite DEFAULT_CIVILITE = Civilite.M;
    private static final Civilite UPDATED_CIVILITE = Civilite.MME;

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_GROUPE_POLITIQUE = "AAAAAAAAAA";
    private static final String UPDATED_GROUPE_POLITIQUE = "BBBBBBBBBB";

    private static final String DEFAULT_GROUPE_POLITIQUE_COURT = "AAAAAAAAAA";
    private static final String UPDATED_GROUPE_POLITIQUE_COURT = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIF = false;
    private static final Boolean UPDATED_ACTIF = true;

    @Autowired
    private EluRepository eluRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.EluSearchRepositoryMockConfiguration
     */
    @Autowired
    private EluSearchRepository mockEluSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEluMockMvc;

    private Elu elu;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Elu createEntity(EntityManager em) {
        Elu elu = new Elu()
            .sourceId(DEFAULT_SOURCE_ID)
            .sourceUid(DEFAULT_SOURCE_UID)
            .civilite(DEFAULT_CIVILITE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .groupePolitique(DEFAULT_GROUPE_POLITIQUE)
            .groupePolitiqueCourt(DEFAULT_GROUPE_POLITIQUE_COURT)
            .image(DEFAULT_IMAGE)
            .actif(DEFAULT_ACTIF);
        return elu;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Elu createUpdatedEntity(EntityManager em) {
        Elu elu = new Elu()
            .sourceId(UPDATED_SOURCE_ID)
            .sourceUid(UPDATED_SOURCE_UID)
            .civilite(UPDATED_CIVILITE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .groupePolitique(UPDATED_GROUPE_POLITIQUE)
            .groupePolitiqueCourt(UPDATED_GROUPE_POLITIQUE_COURT)
            .image(UPDATED_IMAGE)
            .actif(UPDATED_ACTIF);
        return elu;
    }

    @BeforeEach
    public void initTest() {
        elu = createEntity(em);
    }

    @Test
    @Transactional
    public void createElu() throws Exception {
        int databaseSizeBeforeCreate = eluRepository.findAll().size();
        // Create the Elu
        restEluMockMvc.perform(post("/api/elus").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(elu)))
            .andExpect(status().isCreated());

        // Validate the Elu in the database
        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeCreate + 1);
        Elu testElu = eluList.get(eluList.size() - 1);
        assertThat(testElu.getSourceId()).isEqualTo(DEFAULT_SOURCE_ID);
        assertThat(testElu.getSourceUid()).isEqualTo(DEFAULT_SOURCE_UID);
        assertThat(testElu.getCivilite()).isEqualTo(DEFAULT_CIVILITE);
        assertThat(testElu.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testElu.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testElu.getGroupePolitique()).isEqualTo(DEFAULT_GROUPE_POLITIQUE);
        assertThat(testElu.getGroupePolitiqueCourt()).isEqualTo(DEFAULT_GROUPE_POLITIQUE_COURT);
        assertThat(testElu.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testElu.isActif()).isEqualTo(DEFAULT_ACTIF);

        // Validate the Elu in Elasticsearch
        verify(mockEluSearchRepository, times(1)).save(testElu);
    }

    @Test
    @Transactional
    public void createEluWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eluRepository.findAll().size();

        // Create the Elu with an existing ID
        elu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEluMockMvc.perform(post("/api/elus").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(elu)))
            .andExpect(status().isBadRequest());

        // Validate the Elu in the database
        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeCreate);

        // Validate the Elu in Elasticsearch
        verify(mockEluSearchRepository, times(0)).save(elu);
    }


    @Test
    @Transactional
    public void checkSourceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = eluRepository.findAll().size();
        // set the field null
        elu.setSourceId(null);

        // Create the Elu, which fails.


        restEluMockMvc.perform(post("/api/elus").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(elu)))
            .andExpect(status().isBadRequest());

        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSourceUidIsRequired() throws Exception {
        int databaseSizeBeforeTest = eluRepository.findAll().size();
        // set the field null
        elu.setSourceUid(null);

        // Create the Elu, which fails.


        restEluMockMvc.perform(post("/api/elus").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(elu)))
            .andExpect(status().isBadRequest());

        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllElus() throws Exception {
        // Initialize the database
        eluRepository.saveAndFlush(elu);

        // Get all the eluList
        restEluMockMvc.perform(get("/api/elus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(elu.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(DEFAULT_SOURCE_ID)))
            .andExpect(jsonPath("$.[*].sourceUid").value(hasItem(DEFAULT_SOURCE_UID)))
            .andExpect(jsonPath("$.[*].civilite").value(hasItem(DEFAULT_CIVILITE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].groupePolitique").value(hasItem(DEFAULT_GROUPE_POLITIQUE)))
            .andExpect(jsonPath("$.[*].groupePolitiqueCourt").value(hasItem(DEFAULT_GROUPE_POLITIQUE_COURT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].actif").value(hasItem(DEFAULT_ACTIF.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getElu() throws Exception {
        // Initialize the database
        eluRepository.saveAndFlush(elu);

        // Get the elu
        restEluMockMvc.perform(get("/api/elus/{id}", elu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(elu.getId().intValue()))
            .andExpect(jsonPath("$.sourceId").value(DEFAULT_SOURCE_ID))
            .andExpect(jsonPath("$.sourceUid").value(DEFAULT_SOURCE_UID))
            .andExpect(jsonPath("$.civilite").value(DEFAULT_CIVILITE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.groupePolitique").value(DEFAULT_GROUPE_POLITIQUE))
            .andExpect(jsonPath("$.groupePolitiqueCourt").value(DEFAULT_GROUPE_POLITIQUE_COURT))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.actif").value(DEFAULT_ACTIF.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingElu() throws Exception {
        // Get the elu
        restEluMockMvc.perform(get("/api/elus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateElu() throws Exception {
        // Initialize the database
        eluRepository.saveAndFlush(elu);

        int databaseSizeBeforeUpdate = eluRepository.findAll().size();

        // Update the elu
        Elu updatedElu = eluRepository.findById(elu.getId()).get();
        // Disconnect from session so that the updates on updatedElu are not directly saved in db
        em.detach(updatedElu);
        updatedElu
            .sourceId(UPDATED_SOURCE_ID)
            .sourceUid(UPDATED_SOURCE_UID)
            .civilite(UPDATED_CIVILITE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .groupePolitique(UPDATED_GROUPE_POLITIQUE)
            .groupePolitiqueCourt(UPDATED_GROUPE_POLITIQUE_COURT)
            .image(UPDATED_IMAGE)
            .actif(UPDATED_ACTIF);

        restEluMockMvc.perform(put("/api/elus").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedElu)))
            .andExpect(status().isOk());

        // Validate the Elu in the database
        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeUpdate);
        Elu testElu = eluList.get(eluList.size() - 1);
        assertThat(testElu.getSourceId()).isEqualTo(UPDATED_SOURCE_ID);
        assertThat(testElu.getSourceUid()).isEqualTo(UPDATED_SOURCE_UID);
        assertThat(testElu.getCivilite()).isEqualTo(UPDATED_CIVILITE);
        assertThat(testElu.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testElu.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testElu.getGroupePolitique()).isEqualTo(UPDATED_GROUPE_POLITIQUE);
        assertThat(testElu.getGroupePolitiqueCourt()).isEqualTo(UPDATED_GROUPE_POLITIQUE_COURT);
        assertThat(testElu.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testElu.isActif()).isEqualTo(UPDATED_ACTIF);

        // Validate the Elu in Elasticsearch
        verify(mockEluSearchRepository, times(1)).save(testElu);
    }

    @Test
    @Transactional
    public void updateNonExistingElu() throws Exception {
        int databaseSizeBeforeUpdate = eluRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEluMockMvc.perform(put("/api/elus").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(elu)))
            .andExpect(status().isBadRequest());

        // Validate the Elu in the database
        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Elu in Elasticsearch
        verify(mockEluSearchRepository, times(0)).save(elu);
    }

    @Test
    @Transactional
    public void deleteElu() throws Exception {
        // Initialize the database
        eluRepository.saveAndFlush(elu);

        int databaseSizeBeforeDelete = eluRepository.findAll().size();

        // Delete the elu
        restEluMockMvc.perform(delete("/api/elus/{id}", elu.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Elu> eluList = eluRepository.findAll();
        assertThat(eluList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Elu in Elasticsearch
        verify(mockEluSearchRepository, times(1)).deleteById(elu.getId());
    }

    @Test
    @Transactional
    public void searchElu() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        eluRepository.saveAndFlush(elu);
        when(mockEluSearchRepository.search(queryStringQuery("id:" + elu.getId())))
            .thenReturn(Collections.singletonList(elu));

        // Search the elu
        restEluMockMvc.perform(get("/api/_search/elus?query=id:" + elu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(elu.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(DEFAULT_SOURCE_ID)))
            .andExpect(jsonPath("$.[*].sourceUid").value(hasItem(DEFAULT_SOURCE_UID)))
            .andExpect(jsonPath("$.[*].civilite").value(hasItem(DEFAULT_CIVILITE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].groupePolitique").value(hasItem(DEFAULT_GROUPE_POLITIQUE)))
            .andExpect(jsonPath("$.[*].groupePolitiqueCourt").value(hasItem(DEFAULT_GROUPE_POLITIQUE_COURT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].actif").value(hasItem(DEFAULT_ACTIF.booleanValue())));
    }
}
