package orgarif.command

import org.jooq.DSLContext
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.stereotype.Service
import orgarif.config.SafeSessionRepository
import orgarif.domain.Session
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionService

@Service
class AdminUpdateSessionsCommandHandler(
    private val jooq: DSLContext,
    private val sessionRepository: SafeSessionRepository,
    private val userService: UserService,
    private val userSessionService: UserSessionService,
) : CommandHandler.Handler<AdminUpdateSessions, EmptyCommandResponse>() {

    override fun handle(command: AdminUpdateSessions): EmptyCommandResponse {
        updateSessions()
        return EmptyCommandResponse
    }

    fun updateSessions() =
        synchronized(this) {
            jooq.connection { connection ->
                val sessionIds =
                    connection.createStatement().use {
                        val r = it.executeQuery("select session_id from spring_session")
                        jooq.fetch(r).map { it.getValue("session_id") as String }
                    }
                sessionIds
                    .mapNotNull { sessionRepository.findById(it) }
                    .forEach { session ->
                        val context =
                            session.getAttribute<SecurityContextImpl>(
                                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY)
                        val conversion =
                            ((context.authentication as UsernamePasswordAuthenticationToken)
                                    .principal as Session)
                                .let { userSessionService.convert(it) }
                        if (conversion.needsUpdate) {
                            userService.updateSession(session, conversion.session)
                        }
                    }
            }
        }
}
