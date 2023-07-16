package orgarif.utils

import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@ContextConfiguration(initializers = [ContainerInitializer::class])
@ActiveProfiles("test")
@Transactional
interface PostgresIntegrationTest
