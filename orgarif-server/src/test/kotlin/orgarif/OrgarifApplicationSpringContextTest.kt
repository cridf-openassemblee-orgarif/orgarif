package orgarif

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner::class)
internal class OrgarifApplicationSpringContextTest {

    init {
        ResetTestDatabase.reset(false)
    }

    @Test
    fun `context does load`() {
    }

}
