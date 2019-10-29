package orgarif.endpoint

import org.hamcrest.CoreMatchers.hasItem
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.web.PageableHandlerMethodArgumentResolver
import org.springframework.http.MediaType
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import orgarif.OrgarifApp
import orgarif.domain.Elu
import orgarif.repository.EluRepository
import orgarif.web.rest.TestUtil.createFormattingConversionService
import orgarif.web.rest.errors.ExceptionTranslator

@SpringBootTest(classes = [OrgarifApp::class])
class ListEndpointIT {

    @Autowired
    lateinit var listEndpoint: ListEndpoint

    @Autowired
    lateinit var reluRepository: EluRepository

    @Autowired
    lateinit var jacksonMessageConverter: MappingJackson2HttpMessageConverter

    @Autowired
    lateinit var pageableArgumentResolver: PageableHandlerMethodArgumentResolver

    @Autowired
    lateinit var exceptionTranslator: ExceptionTranslator

    lateinit private var restInstanceMockMvc: MockMvc

    val eluId = 1L

    @BeforeEach
    fun setup() {
//        MockitoAnnotations.initMocks(this)
        this.restInstanceMockMvc = MockMvcBuilders.standaloneSetup(listEndpoint)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .build()
        reluRepository.save(Elu().apply {
            id = eluId
            sourceId = eluId.toString()
            sourceUid = eluId.toString()
        })
    }

    @AfterEach
    fun tearDown() {
        reluRepository.deleteById(eluId)
    }

    @Test
    fun getAllElus() {
        restInstanceMockMvc.perform(get("/api/list/elus"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eluId.toInt())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(eluId.toString())))
            .andExpect(jsonPath("$.[*].sourceUid").value(hasItem(eluId.toString())))
    }

}
