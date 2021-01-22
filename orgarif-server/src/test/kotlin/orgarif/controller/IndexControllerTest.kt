package orgarif.controller

import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner::class)
internal class IndexControllerTest {

    @Autowired
    lateinit var indexController: IndexController

    @Test
    fun `test magic link url rewriting`() {
        assertEquals("", indexController.rewriteQueryString(mapOf()))
        assertEquals(
            "param1=value1&param2=value2", indexController.rewriteQueryString(
                mapOf(
                    "param1" to arrayOf("value1"),
                    "param2" to arrayOf("value2")
                )
            )
        )
        assertEquals(
            "param1=value1&param2=value2", indexController.rewriteQueryString(
                mapOf(
                    "param1" to arrayOf("value1"),
                    IndexController.magicTokenParameterName to arrayOf("magicToken"),
                    "param2" to arrayOf("value2")
                )
            )
        )
        assertEquals(
            "param1=value11&param1=value12&param2=value2", indexController.rewriteQueryString(
                mapOf(
                    "param1" to arrayOf("value11", "value12"),
                    "param2" to arrayOf("value2")
                )
            )
        )
    }

}
