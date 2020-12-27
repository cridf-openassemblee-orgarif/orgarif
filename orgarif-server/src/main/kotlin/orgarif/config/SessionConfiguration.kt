package orgarif.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.session.Session
import org.springframework.session.SessionRepository
import orgarif.service.ApplicationInstance

@Configuration
class SessionConfiguration {

    @Primary
    @Bean
    @Suppress("UNCHECKED_CAST")
    fun <S : Session?> safeSessionRepository(applicationInstance: ApplicationInstance,
                                             sessionRepository: SessionRepository<S>) =
            SafeSessionRepository(applicationInstance, sessionRepository as SessionRepository<Session>)

}
