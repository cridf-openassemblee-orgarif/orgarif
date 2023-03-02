package orgarif.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.session.FindByIndexNameSessionRepository
import org.springframework.session.Session

@Configuration
class SessionConfiguration {

    @Primary
    @Bean
    fun <S : Session?> safeSessionRepository(
        sessionRepository: FindByIndexNameSessionRepository<S>
    ) =
        @Suppress("UNCHECKED_CAST")
        SafeSessionRepository(sessionRepository as FindByIndexNameSessionRepository<Session>)
}
