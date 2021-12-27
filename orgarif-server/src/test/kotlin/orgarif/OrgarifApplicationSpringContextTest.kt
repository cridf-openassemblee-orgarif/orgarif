package orgarif

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("test")
internal class OrgarifApplicationSpringContextTest {

    @BeforeEach
    fun init() {
        ResetTestDatabase.reset(false)
    }

    @Test fun `context does load`() {}
}
