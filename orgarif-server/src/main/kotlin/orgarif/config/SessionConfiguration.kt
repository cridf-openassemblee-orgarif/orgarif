package orgarif.config

import orgarif.service.ApplicationInstance
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.session.Session
import org.springframework.session.SessionRepository

@Configuration
class SessionConfiguration {

    @Primary
    @Bean
    @Suppress("UNCHECKED_CAST")
    fun <S : Session?> safeSessionRepository(applicationInstance: ApplicationInstance,
                                             sessionRepository: SessionRepository<S>) =
            SafeSessionRepository(applicationInstance, sessionRepository as SessionRepository<Session>)

}
