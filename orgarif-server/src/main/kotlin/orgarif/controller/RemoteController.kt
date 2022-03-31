package orgarif.controller

import mu.KotlinLogging
import org.jooq.DSLContext
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.session.Session as SpringSession
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import orgarif.config.SafeSessionRepository
import orgarif.controller.RemoteController.Companion.remoteRoute
import orgarif.domain.Role
import orgarif.domain.Session as OrgarifSession
import orgarif.domain.UserSession
import orgarif.repository.EluDao
import orgarif.repository.RepresentantDao
import orgarif.repository.RepresentationDao
import orgarif.repository.SuppleanceDao
import orgarif.repository.user.UserDao
import orgarif.repository.user.UserSessionLogDao
import orgarif.service.RandomService
import orgarif.service.user.UserSessionService
import orgarif.service.utils.TransactionIsolationService

@RestController
@RequestMapping(remoteRoute)
class RemoteController(
    @Value("\${remote-endpoint.expected-secu}") val expectedSecu: String,
    val jooq: DSLContext,
    val userDao: UserDao,
    val userSessionLogDao: UserSessionLogDao,
    val eluDao: EluDao,
    val representantDao: RepresentantDao,
    val representationDao: RepresentationDao,
    val suppleanceDao: SuppleanceDao,
    val sessionRepository: SafeSessionRepository,
    val userSessionService: UserSessionService,
    val randomService: RandomService,
    val transactionIsolationService: TransactionIsolationService
) {

    val logger = KotlinLogging.logger {}

    companion object {
        const val remoteRoute = "/remote"
        private val SPRING_SECURITY_CONTEXT = "SPRING_SECURITY_CONTEXT"
    }

    private fun checkSecu(secu: String) {
        if (secu != expectedSecu) {
            throw IllegalArgumentException("missing secu")
        }
    }

    @PostMapping("/update-sessions")
    fun updateSessions(@RequestParam secu: String) =
        synchronized(this) {
            checkSecu(secu)
            jooq.connection { connection ->
                val sessionIds =
                    connection.createStatement().use {
                        val r = it.executeQuery("select session_id from spring_session")
                        jooq.fetch(r).map { it.getValue("session_id") as String }
                    }
                sessionIds.mapNotNull { sessionRepository.findById(it) }.forEach { session ->
                    val context = session.getAttribute<SecurityContextImpl>(SPRING_SECURITY_CONTEXT)
                    val conversion =
                        ((context.authentication as UsernamePasswordAuthenticationToken)
                                .principal as
                                OrgarifSession)
                            .let { userSessionService.convert(it) }
                    if (conversion.needsUpdate) {
                        updateSession(session, conversion.session)
                    }
                }
            }
        }

    @PostMapping("/add-role")
    fun addUserRole(
        @RequestParam secu: String,
        @RequestParam email: String,
        @RequestParam role: Role
    ) =
        synchronized(this) {
            checkSecu(secu)
            val user = userDao.fetchByMail(email) ?: throw IllegalArgumentException()
            val roles = user.roles + role
            userDao.updateRoles(user.id, roles)
            userSessionLogDao.fetchIdsByUserId(user.id).forEach { sessionId ->
                val userSession = UserSession(sessionId, user.id, roles)
                val userSessionPrincipalName = userSession.toString()
                sessionRepository.findByPrincipalName(userSessionPrincipalName).values.forEach {
                    updateSession(it, userSession)
                }
            }
        }

    private fun updateSession(session: SpringSession, userSession: UserSession) {
        logger.info { "Save up-to-date session ${session.id}" }
        val springAuthentication = UsernamePasswordAuthenticationToken(userSession, null, null)
        val context = session.getAttribute<SecurityContextImpl>(SPRING_SECURITY_CONTEXT)
        context.authentication = springAuthentication
        session.setAttribute(SPRING_SECURITY_CONTEXT, context)
        transactionIsolationService.execute { sessionRepository.save(session) }
    }
}
