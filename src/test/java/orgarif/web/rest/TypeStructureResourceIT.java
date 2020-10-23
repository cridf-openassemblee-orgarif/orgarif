package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.TypeStructure;
import orgarif.repository.TypeStructureRepository;
import orgarif.repository.search.TypeStructureSearchRepository;

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
 * Integration tests for the {@link TypeStructureResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
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
    private EntityManager em;

    @Autowired
    private MockMvc restTypeStructureMockMvc;

    private TypeStructure typeStructure;

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
        restTypeStructureMockMvc.perform(post("/api/type-structures").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
        restTypeStructureMockMvc.perform(post("/api/type-structures").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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


        restTypeStructureMockMvc.perform(post("/api/type-structures").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
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
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
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

        restTypeStructureMockMvc.perform(put("/api/type-structures").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeStructureMockMvc.perform(put("/api/type-structures").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
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
        restTypeStructureMockMvc.perform(delete("/api/type-structures/{id}", typeStructure.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
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
        // Configure the mock search repository
        // Initialize the database
        typeStructureRepository.saveAndFlush(typeStructure);
        when(mockTypeStructureSearchRepository.search(queryStringQuery("id:" + typeStructure.getId())))
            .thenReturn(Collections.singletonList(typeStructure));

        // Search the typeStructure
        restTypeStructureMockMvc.perform(get("/api/_search/type-structures?query=id:" + typeStructure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeStructure.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }
}
