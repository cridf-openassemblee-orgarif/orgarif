package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.Instance;
import orgarif.domain.Organisme;
import orgarif.repository.InstanceRepository;
import orgarif.repository.search.InstanceSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
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
 * Integration tests for the {@link InstanceResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class InstanceResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOMBRE_REPRESENTANTS = 1;
    private static final Integer UPDATED_NOMBRE_REPRESENTANTS = 2;

    private static final Integer DEFAULT_NOMBRE_SUPPLEANTS = 1;
    private static final Integer UPDATED_NOMBRE_SUPPLEANTS = 2;

    @Autowired
    private InstanceRepository instanceRepository;

    @Mock
    private InstanceRepository instanceRepositoryMock;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.InstanceSearchRepositoryMockConfiguration
     */
    @Autowired
    private InstanceSearchRepository mockInstanceSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInstanceMockMvc;

    private Instance instance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instance createEntity(EntityManager em) {
        Instance instance = new Instance()
            .nom(DEFAULT_NOM)
            .nombreRepresentants(DEFAULT_NOMBRE_REPRESENTANTS)
            .nombreSuppleants(DEFAULT_NOMBRE_SUPPLEANTS);
        // Add required entity
        Organisme organisme;
        if (TestUtil.findAll(em, Organisme.class).isEmpty()) {
            organisme = OrganismeResourceIT.createEntity(em);
            em.persist(organisme);
            em.flush();
        } else {
            organisme = TestUtil.findAll(em, Organisme.class).get(0);
        }
        instance.setOrganisme(organisme);
        return instance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instance createUpdatedEntity(EntityManager em) {
        Instance instance = new Instance()
            .nom(UPDATED_NOM)
            .nombreRepresentants(UPDATED_NOMBRE_REPRESENTANTS)
            .nombreSuppleants(UPDATED_NOMBRE_SUPPLEANTS);
        // Add required entity
        Organisme organisme;
        if (TestUtil.findAll(em, Organisme.class).isEmpty()) {
            organisme = OrganismeResourceIT.createUpdatedEntity(em);
            em.persist(organisme);
            em.flush();
        } else {
            organisme = TestUtil.findAll(em, Organisme.class).get(0);
        }
        instance.setOrganisme(organisme);
        return instance;
    }

    @BeforeEach
    public void initTest() {
        instance = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstance() throws Exception {
        int databaseSizeBeforeCreate = instanceRepository.findAll().size();
        // Create the Instance
        restInstanceMockMvc.perform(post("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isCreated());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeCreate + 1);
        Instance testInstance = instanceList.get(instanceList.size() - 1);
        assertThat(testInstance.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testInstance.getNombreRepresentants()).isEqualTo(DEFAULT_NOMBRE_REPRESENTANTS);
        assertThat(testInstance.getNombreSuppleants()).isEqualTo(DEFAULT_NOMBRE_SUPPLEANTS);

        // Validate the Instance in Elasticsearch
        verify(mockInstanceSearchRepository, times(1)).save(testInstance);
    }

    @Test
    @Transactional
    public void createInstanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instanceRepository.findAll().size();

        // Create the Instance with an existing ID
        instance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstanceMockMvc.perform(post("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeCreate);

        // Validate the Instance in Elasticsearch
        verify(mockInstanceSearchRepository, times(0)).save(instance);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = instanceRepository.findAll().size();
        // set the field null
        instance.setNom(null);

        // Create the Instance, which fails.


        restInstanceMockMvc.perform(post("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreRepresentantsIsRequired() throws Exception {
        int databaseSizeBeforeTest = instanceRepository.findAll().size();
        // set the field null
        instance.setNombreRepresentants(null);

        // Create the Instance, which fails.


        restInstanceMockMvc.perform(post("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreSuppleantsIsRequired() throws Exception {
        int databaseSizeBeforeTest = instanceRepository.findAll().size();
        // set the field null
        instance.setNombreSuppleants(null);

        // Create the Instance, which fails.


        restInstanceMockMvc.perform(post("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInstances() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        // Get all the instanceList
        restInstanceMockMvc.perform(get("/api/instances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instance.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].nombreRepresentants").value(hasItem(DEFAULT_NOMBRE_REPRESENTANTS)))
            .andExpect(jsonPath("$.[*].nombreSuppleants").value(hasItem(DEFAULT_NOMBRE_SUPPLEANTS)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllInstancesWithEagerRelationshipsIsEnabled() throws Exception {
        when(instanceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restInstanceMockMvc.perform(get("/api/instances?eagerload=true"))
            .andExpect(status().isOk());

        verify(instanceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllInstancesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(instanceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restInstanceMockMvc.perform(get("/api/instances?eagerload=true"))
            .andExpect(status().isOk());

        verify(instanceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getInstance() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        // Get the instance
        restInstanceMockMvc.perform(get("/api/instances/{id}", instance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(instance.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.nombreRepresentants").value(DEFAULT_NOMBRE_REPRESENTANTS))
            .andExpect(jsonPath("$.nombreSuppleants").value(DEFAULT_NOMBRE_SUPPLEANTS));
    }
    @Test
    @Transactional
    public void getNonExistingInstance() throws Exception {
        // Get the instance
        restInstanceMockMvc.perform(get("/api/instances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstance() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        int databaseSizeBeforeUpdate = instanceRepository.findAll().size();

        // Update the instance
        Instance updatedInstance = instanceRepository.findById(instance.getId()).get();
        // Disconnect from session so that the updates on updatedInstance are not directly saved in db
        em.detach(updatedInstance);
        updatedInstance
            .nom(UPDATED_NOM)
            .nombreRepresentants(UPDATED_NOMBRE_REPRESENTANTS)
            .nombreSuppleants(UPDATED_NOMBRE_SUPPLEANTS);

        restInstanceMockMvc.perform(put("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstance)))
            .andExpect(status().isOk());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeUpdate);
        Instance testInstance = instanceList.get(instanceList.size() - 1);
        assertThat(testInstance.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testInstance.getNombreRepresentants()).isEqualTo(UPDATED_NOMBRE_REPRESENTANTS);
        assertThat(testInstance.getNombreSuppleants()).isEqualTo(UPDATED_NOMBRE_SUPPLEANTS);

        // Validate the Instance in Elasticsearch
        verify(mockInstanceSearchRepository, times(1)).save(testInstance);
    }

    @Test
    @Transactional
    public void updateNonExistingInstance() throws Exception {
        int databaseSizeBeforeUpdate = instanceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstanceMockMvc.perform(put("/api/instances").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Instance in Elasticsearch
        verify(mockInstanceSearchRepository, times(0)).save(instance);
    }

    @Test
    @Transactional
    public void deleteInstance() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        int databaseSizeBeforeDelete = instanceRepository.findAll().size();

        // Delete the instance
        restInstanceMockMvc.perform(delete("/api/instances/{id}", instance.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Instance in Elasticsearch
        verify(mockInstanceSearchRepository, times(1)).deleteById(instance.getId());
    }

    @Test
    @Transactional
    public void searchInstance() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        instanceRepository.saveAndFlush(instance);
        when(mockInstanceSearchRepository.search(queryStringQuery("id:" + instance.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(instance), PageRequest.of(0, 1), 1));

        // Search the instance
        restInstanceMockMvc.perform(get("/api/_search/instances?query=id:" + instance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instance.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].nombreRepresentants").value(hasItem(DEFAULT_NOMBRE_REPRESENTANTS)))
            .andExpect(jsonPath("$.[*].nombreSuppleants").value(hasItem(DEFAULT_NOMBRE_SUPPLEANTS)));
    }
}
