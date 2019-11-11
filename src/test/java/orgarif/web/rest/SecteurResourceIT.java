package orgarif.web.rest;

import orgarif.OrgarifApp;
import orgarif.domain.Secteur;
import orgarif.repository.SecteurRepository;
import orgarif.repository.search.SecteurSearchRepository;
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
 * Integration tests for the {@link SecteurResource} REST controller.
 */
@SpringBootTest(classes = OrgarifApp.class)
public class SecteurResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private SecteurRepository secteurRepository;

    /**
     * This repository is mocked in the orgarif.repository.search test package.
     *
     * @see orgarif.repository.search.SecteurSearchRepositoryMockConfiguration
     */
    @Autowired
    private SecteurSearchRepository mockSecteurSearchRepository;

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

    private MockMvc restSecteurMockMvc;

    private Secteur secteur;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SecteurResource secteurResource = new SecteurResource(secteurRepository, mockSecteurSearchRepository, auditTrailService);
        this.restSecteurMockMvc = MockMvcBuilders.standaloneSetup(secteurResource)
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
    public static Secteur createEntity(EntityManager em) {
        Secteur secteur = new Secteur()
            .label(DEFAULT_LABEL);
        return secteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Secteur createUpdatedEntity(EntityManager em) {
        Secteur secteur = new Secteur()
            .label(UPDATED_LABEL);
        return secteur;
    }

    @BeforeEach
    public void initTest() {
        secteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createSecteur() throws Exception {
        int databaseSizeBeforeCreate = secteurRepository.findAll().size();

        // Create the Secteur
        restSecteurMockMvc.perform(post("/api/secteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secteur)))
            .andExpect(status().isCreated());

        // Validate the Secteur in the database
        List<Secteur> secteurList = secteurRepository.findAll();
        assertThat(secteurList).hasSize(databaseSizeBeforeCreate + 1);
        Secteur testSecteur = secteurList.get(secteurList.size() - 1);
        assertThat(testSecteur.getLabel()).isEqualTo(DEFAULT_LABEL);

        // Validate the Secteur in Elasticsearch
        verify(mockSecteurSearchRepository, times(1)).save(testSecteur);
    }

    @Test
    @Transactional
    public void createSecteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = secteurRepository.findAll().size();

        // Create the Secteur with an existing ID
        secteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSecteurMockMvc.perform(post("/api/secteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secteur)))
            .andExpect(status().isBadRequest());

        // Validate the Secteur in the database
        List<Secteur> secteurList = secteurRepository.findAll();
        assertThat(secteurList).hasSize(databaseSizeBeforeCreate);

        // Validate the Secteur in Elasticsearch
        verify(mockSecteurSearchRepository, times(0)).save(secteur);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = secteurRepository.findAll().size();
        // set the field null
        secteur.setLabel(null);

        // Create the Secteur, which fails.

        restSecteurMockMvc.perform(post("/api/secteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secteur)))
            .andExpect(status().isBadRequest());

        List<Secteur> secteurList = secteurRepository.findAll();
        assertThat(secteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSecteurs() throws Exception {
        // Initialize the database
        secteurRepository.saveAndFlush(secteur);

        // Get all the secteurList
        restSecteurMockMvc.perform(get("/api/secteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(secteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }

    @Test
    @Transactional
    public void getSecteur() throws Exception {
        // Initialize the database
        secteurRepository.saveAndFlush(secteur);

        // Get the secteur
        restSecteurMockMvc.perform(get("/api/secteurs/{id}", secteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(secteur.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }

    @Test
    @Transactional
    public void getNonExistingSecteur() throws Exception {
        // Get the secteur
        restSecteurMockMvc.perform(get("/api/secteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSecteur() throws Exception {
        // Initialize the database
        secteurRepository.saveAndFlush(secteur);

        int databaseSizeBeforeUpdate = secteurRepository.findAll().size();

        // Update the secteur
        Secteur updatedSecteur = secteurRepository.findById(secteur.getId()).get();
        // Disconnect from session so that the updates on updatedSecteur are not directly saved in db
        em.detach(updatedSecteur);
        updatedSecteur
            .label(UPDATED_LABEL);

        restSecteurMockMvc.perform(put("/api/secteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSecteur)))
            .andExpect(status().isOk());

        // Validate the Secteur in the database
        List<Secteur> secteurList = secteurRepository.findAll();
        assertThat(secteurList).hasSize(databaseSizeBeforeUpdate);
        Secteur testSecteur = secteurList.get(secteurList.size() - 1);
        assertThat(testSecteur.getLabel()).isEqualTo(UPDATED_LABEL);

        // Validate the Secteur in Elasticsearch
        verify(mockSecteurSearchRepository, times(1)).save(testSecteur);
    }

    @Test
    @Transactional
    public void updateNonExistingSecteur() throws Exception {
        int databaseSizeBeforeUpdate = secteurRepository.findAll().size();

        // Create the Secteur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSecteurMockMvc.perform(put("/api/secteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secteur)))
            .andExpect(status().isBadRequest());

        // Validate the Secteur in the database
        List<Secteur> secteurList = secteurRepository.findAll();
        assertThat(secteurList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Secteur in Elasticsearch
        verify(mockSecteurSearchRepository, times(0)).save(secteur);
    }

    @Test
    @Transactional
    public void deleteSecteur() throws Exception {
        // Initialize the database
        secteurRepository.saveAndFlush(secteur);

        int databaseSizeBeforeDelete = secteurRepository.findAll().size();

        // Delete the secteur
        restSecteurMockMvc.perform(delete("/api/secteurs/{id}", secteur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Secteur> secteurList = secteurRepository.findAll();
        assertThat(secteurList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Secteur in Elasticsearch
        verify(mockSecteurSearchRepository, times(1)).deleteById(secteur.getId());
    }

    @Test
    @Transactional
    public void searchSecteur() throws Exception {
        // Initialize the database
        secteurRepository.saveAndFlush(secteur);
        when(mockSecteurSearchRepository.search(queryStringQuery("id:" + secteur.getId())))
            .thenReturn(Collections.singletonList(secteur));
        // Search the secteur
        restSecteurMockMvc.perform(get("/api/_search/secteurs?query=id:" + secteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(secteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Secteur.class);
        Secteur secteur1 = new Secteur();
        secteur1.setId(1L);
        Secteur secteur2 = new Secteur();
        secteur2.setId(secteur1.getId());
        assertThat(secteur1).isEqualTo(secteur2);
        secteur2.setId(2L);
        assertThat(secteur1).isNotEqualTo(secteur2);
        secteur1.setId(null);
        assertThat(secteur1).isNotEqualTo(secteur2);
    }
}
