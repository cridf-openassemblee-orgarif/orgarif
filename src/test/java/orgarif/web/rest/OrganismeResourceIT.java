package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.Organisme;
import orgarif.domain.NatureJuridique;
import orgarif.domain.Secteur;
import orgarif.repository.OrganismeRepository;
import orgarif.repository.search.OrganismeSearchRepository;
import orgarif.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
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
import java.util.ArrayList;
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
 * Integration tests for the {@link OrganismeResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
public class OrganismeResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOMBRE_REPRESENTANTS = 1;
    private static final Integer UPDATED_NOMBRE_REPRESENTANTS = 2;

    private static final Integer DEFAULT_NOMBRE_SUPPLEANTS = 1;
    private static final Integer UPDATED_NOMBRE_SUPPLEANTS = 2;

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_PARTAGE_REPRESENTANTS = false;
    private static final Boolean UPDATED_PARTAGE_REPRESENTANTS = true;

    @Autowired
    private OrganismeRepository organismeRepository;

    @Mock
    private OrganismeRepository organismeRepositoryMock;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.OrganismeSearchRepositoryMockConfiguration
     */
    @Autowired
    private OrganismeSearchRepository mockOrganismeSearchRepository;

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

    private MockMvc restOrganismeMockMvc;

    private Organisme organisme;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrganismeResource organismeResource = new OrganismeResource(organismeRepository, mockOrganismeSearchRepository);
        this.restOrganismeMockMvc = MockMvcBuilders.standaloneSetup(organismeResource)
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
    public static Organisme createEntity(EntityManager em) {
        Organisme organisme = new Organisme()
            .nom(DEFAULT_NOM)
            .nombreRepresentants(DEFAULT_NOMBRE_REPRESENTANTS)
            .nombreSuppleants(DEFAULT_NOMBRE_SUPPLEANTS)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastModificationDate(DEFAULT_LAST_MODIFICATION_DATE)
            .partageRepresentants(DEFAULT_PARTAGE_REPRESENTANTS);
        // Add required entity
        NatureJuridique natureJuridique;
        if (TestUtil.findAll(em, NatureJuridique.class).isEmpty()) {
            natureJuridique = NatureJuridiqueResourceIT.createEntity(em);
            em.persist(natureJuridique);
            em.flush();
        } else {
            natureJuridique = TestUtil.findAll(em, NatureJuridique.class).get(0);
        }
        organisme.setNatureJuridique(natureJuridique);
        // Add required entity
        Secteur secteur;
        if (TestUtil.findAll(em, Secteur.class).isEmpty()) {
            secteur = SecteurResourceIT.createEntity(em);
            em.persist(secteur);
            em.flush();
        } else {
            secteur = TestUtil.findAll(em, Secteur.class).get(0);
        }
        organisme.setSecteur(secteur);
        return organisme;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Organisme createUpdatedEntity(EntityManager em) {
        Organisme organisme = new Organisme()
            .nom(UPDATED_NOM)
            .nombreRepresentants(UPDATED_NOMBRE_REPRESENTANTS)
            .nombreSuppleants(UPDATED_NOMBRE_SUPPLEANTS)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .partageRepresentants(UPDATED_PARTAGE_REPRESENTANTS);
        // Add required entity
        NatureJuridique natureJuridique;
        if (TestUtil.findAll(em, NatureJuridique.class).isEmpty()) {
            natureJuridique = NatureJuridiqueResourceIT.createUpdatedEntity(em);
            em.persist(natureJuridique);
            em.flush();
        } else {
            natureJuridique = TestUtil.findAll(em, NatureJuridique.class).get(0);
        }
        organisme.setNatureJuridique(natureJuridique);
        // Add required entity
        Secteur secteur;
        if (TestUtil.findAll(em, Secteur.class).isEmpty()) {
            secteur = SecteurResourceIT.createUpdatedEntity(em);
            em.persist(secteur);
            em.flush();
        } else {
            secteur = TestUtil.findAll(em, Secteur.class).get(0);
        }
        organisme.setSecteur(secteur);
        return organisme;
    }

    @BeforeEach
    public void initTest() {
        organisme = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrganisme() throws Exception {
        int databaseSizeBeforeCreate = organismeRepository.findAll().size();

        // Create the Organisme
        restOrganismeMockMvc.perform(post("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisme)))
            .andExpect(status().isCreated());

        // Validate the Organisme in the database
        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeCreate + 1);
        Organisme testOrganisme = organismeList.get(organismeList.size() - 1);
        assertThat(testOrganisme.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testOrganisme.getNombreRepresentants()).isEqualTo(DEFAULT_NOMBRE_REPRESENTANTS);
        assertThat(testOrganisme.getNombreSuppleants()).isEqualTo(DEFAULT_NOMBRE_SUPPLEANTS);
        assertThat(testOrganisme.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testOrganisme.getLastModificationDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_DATE);
        assertThat(testOrganisme.isPartageRepresentants()).isEqualTo(DEFAULT_PARTAGE_REPRESENTANTS);

        // Validate the Organisme in Elasticsearch
        verify(mockOrganismeSearchRepository, times(1)).save(testOrganisme);
    }

    @Test
    @Transactional
    public void createOrganismeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = organismeRepository.findAll().size();

        // Create the Organisme with an existing ID
        organisme.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganismeMockMvc.perform(post("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisme)))
            .andExpect(status().isBadRequest());

        // Validate the Organisme in the database
        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeCreate);

        // Validate the Organisme in Elasticsearch
        verify(mockOrganismeSearchRepository, times(0)).save(organisme);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = organismeRepository.findAll().size();
        // set the field null
        organisme.setNom(null);

        // Create the Organisme, which fails.

        restOrganismeMockMvc.perform(post("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisme)))
            .andExpect(status().isBadRequest());

        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreRepresentantsIsRequired() throws Exception {
        int databaseSizeBeforeTest = organismeRepository.findAll().size();
        // set the field null
        organisme.setNombreRepresentants(null);

        // Create the Organisme, which fails.

        restOrganismeMockMvc.perform(post("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisme)))
            .andExpect(status().isBadRequest());

        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreSuppleantsIsRequired() throws Exception {
        int databaseSizeBeforeTest = organismeRepository.findAll().size();
        // set the field null
        organisme.setNombreSuppleants(null);

        // Create the Organisme, which fails.

        restOrganismeMockMvc.perform(post("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisme)))
            .andExpect(status().isBadRequest());

        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrganismes() throws Exception {
        // Initialize the database
        organismeRepository.saveAndFlush(organisme);

        // Get all the organismeList
        restOrganismeMockMvc.perform(get("/api/organismes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organisme.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].nombreRepresentants").value(hasItem(DEFAULT_NOMBRE_REPRESENTANTS)))
            .andExpect(jsonPath("$.[*].nombreSuppleants").value(hasItem(DEFAULT_NOMBRE_SUPPLEANTS)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModificationDate").value(hasItem(DEFAULT_LAST_MODIFICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].partageRepresentants").value(hasItem(DEFAULT_PARTAGE_REPRESENTANTS.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllOrganismesWithEagerRelationshipsIsEnabled() throws Exception {
        OrganismeResource organismeResource = new OrganismeResource(organismeRepositoryMock, mockOrganismeSearchRepository);
        when(organismeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restOrganismeMockMvc = MockMvcBuilders.standaloneSetup(organismeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restOrganismeMockMvc.perform(get("/api/organismes?eagerload=true"))
        .andExpect(status().isOk());

        verify(organismeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllOrganismesWithEagerRelationshipsIsNotEnabled() throws Exception {
        OrganismeResource organismeResource = new OrganismeResource(organismeRepositoryMock, mockOrganismeSearchRepository);
            when(organismeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restOrganismeMockMvc = MockMvcBuilders.standaloneSetup(organismeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restOrganismeMockMvc.perform(get("/api/organismes?eagerload=true"))
        .andExpect(status().isOk());

            verify(organismeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getOrganisme() throws Exception {
        // Initialize the database
        organismeRepository.saveAndFlush(organisme);

        // Get the organisme
        restOrganismeMockMvc.perform(get("/api/organismes/{id}", organisme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(organisme.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.nombreRepresentants").value(DEFAULT_NOMBRE_REPRESENTANTS))
            .andExpect(jsonPath("$.nombreSuppleants").value(DEFAULT_NOMBRE_SUPPLEANTS))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastModificationDate").value(DEFAULT_LAST_MODIFICATION_DATE.toString()))
            .andExpect(jsonPath("$.partageRepresentants").value(DEFAULT_PARTAGE_REPRESENTANTS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOrganisme() throws Exception {
        // Get the organisme
        restOrganismeMockMvc.perform(get("/api/organismes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrganisme() throws Exception {
        // Initialize the database
        organismeRepository.saveAndFlush(organisme);

        int databaseSizeBeforeUpdate = organismeRepository.findAll().size();

        // Update the organisme
        Organisme updatedOrganisme = organismeRepository.findById(organisme.getId()).get();
        // Disconnect from session so that the updates on updatedOrganisme are not directly saved in db
        em.detach(updatedOrganisme);
        updatedOrganisme
            .nom(UPDATED_NOM)
            .nombreRepresentants(UPDATED_NOMBRE_REPRESENTANTS)
            .nombreSuppleants(UPDATED_NOMBRE_SUPPLEANTS)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .partageRepresentants(UPDATED_PARTAGE_REPRESENTANTS);

        restOrganismeMockMvc.perform(put("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrganisme)))
            .andExpect(status().isOk());

        // Validate the Organisme in the database
        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeUpdate);
        Organisme testOrganisme = organismeList.get(organismeList.size() - 1);
        assertThat(testOrganisme.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testOrganisme.getNombreRepresentants()).isEqualTo(UPDATED_NOMBRE_REPRESENTANTS);
        assertThat(testOrganisme.getNombreSuppleants()).isEqualTo(UPDATED_NOMBRE_SUPPLEANTS);
        assertThat(testOrganisme.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testOrganisme.getLastModificationDate()).isEqualTo(UPDATED_LAST_MODIFICATION_DATE);
        assertThat(testOrganisme.isPartageRepresentants()).isEqualTo(UPDATED_PARTAGE_REPRESENTANTS);

        // Validate the Organisme in Elasticsearch
        verify(mockOrganismeSearchRepository, times(1)).save(testOrganisme);
    }

    @Test
    @Transactional
    public void updateNonExistingOrganisme() throws Exception {
        int databaseSizeBeforeUpdate = organismeRepository.findAll().size();

        // Create the Organisme

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganismeMockMvc.perform(put("/api/organismes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisme)))
            .andExpect(status().isBadRequest());

        // Validate the Organisme in the database
        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Organisme in Elasticsearch
        verify(mockOrganismeSearchRepository, times(0)).save(organisme);
    }

    @Test
    @Transactional
    public void deleteOrganisme() throws Exception {
        // Initialize the database
        organismeRepository.saveAndFlush(organisme);

        int databaseSizeBeforeDelete = organismeRepository.findAll().size();

        // Delete the organisme
        restOrganismeMockMvc.perform(delete("/api/organismes/{id}", organisme.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Organisme> organismeList = organismeRepository.findAll();
        assertThat(organismeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Organisme in Elasticsearch
        verify(mockOrganismeSearchRepository, times(1)).deleteById(organisme.getId());
    }

    @Test
    @Transactional
    public void searchOrganisme() throws Exception {
        // Initialize the database
        organismeRepository.saveAndFlush(organisme);
        when(mockOrganismeSearchRepository.search(queryStringQuery("id:" + organisme.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(organisme), PageRequest.of(0, 1), 1));
        // Search the organisme
        restOrganismeMockMvc.perform(get("/api/_search/organismes?query=id:" + organisme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organisme.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].nombreRepresentants").value(hasItem(DEFAULT_NOMBRE_REPRESENTANTS)))
            .andExpect(jsonPath("$.[*].nombreSuppleants").value(hasItem(DEFAULT_NOMBRE_SUPPLEANTS)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModificationDate").value(hasItem(DEFAULT_LAST_MODIFICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].partageRepresentants").value(hasItem(DEFAULT_PARTAGE_REPRESENTANTS.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Organisme.class);
        Organisme organisme1 = new Organisme();
        organisme1.setId(1L);
        Organisme organisme2 = new Organisme();
        organisme2.setId(organisme1.getId());
        assertThat(organisme1).isEqualTo(organisme2);
        organisme2.setId(2L);
        assertThat(organisme1).isNotEqualTo(organisme2);
        organisme1.setId(null);
        assertThat(organisme1).isNotEqualTo(organisme2);
    }
}
