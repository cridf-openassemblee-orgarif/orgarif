package orgarif.config

import orgarif.service.ApplicationInstance
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.session.FindByIndexNameSessionRepository
import org.springframework.session.Session

@Configuration
class SessionConfiguration {

    @Primary
    @Bean
    @Suppress("UNCHECKED_CAST")
    fun <S : Session?> safeSessionRepository(
        applicationInstance: ApplicationInstance,
        sessionRepository: FindByIndexNameSessionRepository<S>
    ) =
        SafeSessionRepository(applicationInstance, sessionRepository as FindByIndexNameSessionRepository<Session>)

}

