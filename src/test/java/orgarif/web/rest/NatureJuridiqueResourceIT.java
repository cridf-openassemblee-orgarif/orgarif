package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.NatureJuridique;
import orgarif.repository.NatureJuridiqueRepository;
import orgarif.repository.search.NatureJuridiqueSearchRepository;

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

/**
 * Integration tests for the {@link NatureJuridiqueResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NatureJuridiqueResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private NatureJuridiqueRepository natureJuridiqueRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.NatureJuridiqueSearchRepositoryMockConfiguration
     */
    @Autowired
    private NatureJuridiqueSearchRepository mockNatureJuridiqueSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNatureJuridiqueMockMvc;

    private NatureJuridique natureJuridique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NatureJuridique createEntity(EntityManager em) {
        NatureJuridique natureJuridique = new NatureJuridique()
            .label(DEFAULT_LABEL);
        return natureJuridique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NatureJuridique createUpdatedEntity(EntityManager em) {
        NatureJuridique natureJuridique = new NatureJuridique()
            .label(UPDATED_LABEL);
        return natureJuridique;
    }

    @BeforeEach
    public void initTest() {
        natureJuridique = createEntity(em);
    }

    @Test
    @Transactional
    public void createNatureJuridique() throws Exception {
        int databaseSizeBeforeCreate = natureJuridiqueRepository.findAll().size();
        // Create the NatureJuridique
        restNatureJuridiqueMockMvc.perform(post("/api/nature-juridiques").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(natureJuridique)))
            .andExpect(status().isCreated());

        // Validate the NatureJuridique in the database
        List<NatureJuridique> natureJuridiqueList = natureJuridiqueRepository.findAll();
        assertThat(natureJuridiqueList).hasSize(databaseSizeBeforeCreate + 1);
        NatureJuridique testNatureJuridique = natureJuridiqueList.get(natureJuridiqueList.size() - 1);
        assertThat(testNatureJuridique.getLabel()).isEqualTo(DEFAULT_LABEL);

        // Validate the NatureJuridique in Elasticsearch
        verify(mockNatureJuridiqueSearchRepository, times(1)).save(testNatureJuridique);
    }

    @Test
    @Transactional
    public void createNatureJuridiqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = natureJuridiqueRepository.findAll().size();

        // Create the NatureJuridique with an existing ID
        natureJuridique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNatureJuridiqueMockMvc.perform(post("/api/nature-juridiques").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(natureJuridique)))
            .andExpect(status().isBadRequest());

        // Validate the NatureJuridique in the database
        List<NatureJuridique> natureJuridiqueList = natureJuridiqueRepository.findAll();
        assertThat(natureJuridiqueList).hasSize(databaseSizeBeforeCreate);

        // Validate the NatureJuridique in Elasticsearch
        verify(mockNatureJuridiqueSearchRepository, times(0)).save(natureJuridique);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = natureJuridiqueRepository.findAll().size();
        // set the field null
        natureJuridique.setLabel(null);

        // Create the NatureJuridique, which fails.


        restNatureJuridiqueMockMvc.perform(post("/api/nature-juridiques").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(natureJuridique)))
            .andExpect(status().isBadRequest());

        List<NatureJuridique> natureJuridiqueList = natureJuridiqueRepository.findAll();
        assertThat(natureJuridiqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNatureJuridiques() throws Exception {
        // Initialize the database
        natureJuridiqueRepository.saveAndFlush(natureJuridique);

        // Get all the natureJuridiqueList
        restNatureJuridiqueMockMvc.perform(get("/api/nature-juridiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(natureJuridique.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }
    
    @Test
    @Transactional
    public void getNatureJuridique() throws Exception {
        // Initialize the database
        natureJuridiqueRepository.saveAndFlush(natureJuridique);

        // Get the natureJuridique
        restNatureJuridiqueMockMvc.perform(get("/api/nature-juridiques/{id}", natureJuridique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(natureJuridique.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }
    @Test
    @Transactional
    public void getNonExistingNatureJuridique() throws Exception {
        // Get the natureJuridique
        restNatureJuridiqueMockMvc.perform(get("/api/nature-juridiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNatureJuridique() throws Exception {
        // Initialize the database
        natureJuridiqueRepository.saveAndFlush(natureJuridique);

        int databaseSizeBeforeUpdate = natureJuridiqueRepository.findAll().size();

        // Update the natureJuridique
        NatureJuridique updatedNatureJuridique = natureJuridiqueRepository.findById(natureJuridique.getId()).get();
        // Disconnect from session so that the updates on updatedNatureJuridique are not directly saved in db
        em.detach(updatedNatureJuridique);
        updatedNatureJuridique
            .label(UPDATED_LABEL);

        restNatureJuridiqueMockMvc.perform(put("/api/nature-juridiques").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNatureJuridique)))
            .andExpect(status().isOk());

        // Validate the NatureJuridique in the database
        List<NatureJuridique> natureJuridiqueList = natureJuridiqueRepository.findAll();
        assertThat(natureJuridiqueList).hasSize(databaseSizeBeforeUpdate);
        NatureJuridique testNatureJuridique = natureJuridiqueList.get(natureJuridiqueList.size() - 1);
        assertThat(testNatureJuridique.getLabel()).isEqualTo(UPDATED_LABEL);

        // Validate the NatureJuridique in Elasticsearch
        verify(mockNatureJuridiqueSearchRepository, times(1)).save(testNatureJuridique);
    }

    @Test
    @Transactional
    public void updateNonExistingNatureJuridique() throws Exception {
        int databaseSizeBeforeUpdate = natureJuridiqueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNatureJuridiqueMockMvc.perform(put("/api/nature-juridiques").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(natureJuridique)))
            .andExpect(status().isBadRequest());

        // Validate the NatureJuridique in the database
        List<NatureJuridique> natureJuridiqueList = natureJuridiqueRepository.findAll();
        assertThat(natureJuridiqueList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NatureJuridique in Elasticsearch
        verify(mockNatureJuridiqueSearchRepository, times(0)).save(natureJuridique);
    }

    @Test
    @Transactional
    public void deleteNatureJuridique() throws Exception {
        // Initialize the database
        natureJuridiqueRepository.saveAndFlush(natureJuridique);

        int databaseSizeBeforeDelete = natureJuridiqueRepository.findAll().size();

        // Delete the natureJuridique
        restNatureJuridiqueMockMvc.perform(delete("/api/nature-juridiques/{id}", natureJuridique.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NatureJuridique> natureJuridiqueList = natureJuridiqueRepository.findAll();
        assertThat(natureJuridiqueList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NatureJuridique in Elasticsearch
        verify(mockNatureJuridiqueSearchRepository, times(1)).deleteById(natureJuridique.getId());
    }

    @Test
    @Transactional
    public void searchNatureJuridique() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        natureJuridiqueRepository.saveAndFlush(natureJuridique);
        when(mockNatureJuridiqueSearchRepository.search(queryStringQuery("id:" + natureJuridique.getId())))
            .thenReturn(Collections.singletonList(natureJuridique));

        // Search the natureJuridique
        restNatureJuridiqueMockMvc.perform(get("/api/_search/nature-juridiques?query=id:" + natureJuridique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(natureJuridique.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }
}
