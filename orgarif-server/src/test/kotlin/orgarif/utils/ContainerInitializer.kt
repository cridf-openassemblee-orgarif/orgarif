package orgarif.utils

import mu.KotlinLogging
import org.springframework.boot.test.autoconfigure.jooq.JooqTest
import org.springframework.boot.test.util.TestPropertyValues
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.testcontainers.containers.PostgreSQLContainer

@JooqTest
class ContainerInitializer : ApplicationContextInitializer<ConfigurableApplicationContext> {
    private val logger = KotlinLogging.logger {}

    companion object {
        val psql = PostgreSQLContainer("postgres:15.0").also { it.start() }
    }

    override fun initialize(context: ConfigurableApplicationContext) {
        logger.info {
            "Overriding configuration to use database ${psql.host}:${psql.firstMappedPort}"
        }
        TestPropertyValues.of("database.host=${psql.host}", "database.port=${psql.firstMappedPort}")
            .applyTo(context.environment)
    }
}
