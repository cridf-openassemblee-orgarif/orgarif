package orgarif

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("test")
internal class OrgarifApplicationSpringContextTest {

    @Test fun `context does load`() {}
}
