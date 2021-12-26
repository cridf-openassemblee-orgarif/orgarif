package orgarif.config

import mu.KotlinLogging
import org.springframework.session.FindByIndexNameSessionRepository
import org.springframework.session.Session
import orgarif.domain.ApplicationEnvironment
import orgarif.service.ApplicationInstance

// [doc] from
// https://sdqali.in/blog/2016/11/02/handling-deserialization-errors-in-spring-redis-sessions/
// and https://github.com/spring-projects/spring-session/issues/280
// updated for spring boot 2...
class SafeSessionRepository(
    val applicationInstance: ApplicationInstance,
    val repository: FindByIndexNameSessionRepository<Session>
) : FindByIndexNameSessionRepository<Session> by repository {

    private val logger = KotlinLogging.logger {}

    override fun findById(id: String): Session? {
        try {
            return repository.findById(id)
        } catch (e: Exception) {
            if (applicationInstance.env == ApplicationEnvironment.dev) {
                // TODO[user] better mess
                throw IllegalArgumentException(
                    "WARNING session deserialization problem - please prevent it for production", e)
            } else {
                logger.error { "Deleting session $id" }
                deleteById(id)
            }
            return null
        }
    }

    override fun save(session: Session) {
        try {
            repository.save(session)
        } catch (e: Exception) {
            if (applicationInstance.env == ApplicationEnvironment.dev) {
                // TODO[user] better mess
                throw IllegalArgumentException(
                    "ATTENTION problème de serialization de session - ça pique en prod", e)
            } else {
                logger.error { "Deleting session ${session.id}" }
                deleteById(session.id)
            }
        }
    }
}
