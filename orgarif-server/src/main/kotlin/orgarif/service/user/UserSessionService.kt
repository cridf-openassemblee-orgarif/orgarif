package orgarif.service.user

import java.time.Duration
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.stereotype.Service
import orgarif.domain.*
import orgarif.error.AppErrors
import orgarif.error.OrgarifSecurityException
import orgarif.repository.user.UserDao
import orgarif.repository.user.UserSessionLogDao
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class UserSessionService(
    val cookieCsrfTokenRepository: CookieCsrfTokenRepository,
    val userDao: UserDao,
    val userSessionLogDao: UserSessionLogDao,
    val applicationInstance: ApplicationInstance,
    val dateService: DateService,
    val randomService: RandomService
) {

    val logger = KotlinLogging.logger {}

    data class SessionConvertion(val needsUpdate: Boolean, val session: UserSession)

    // TODO[secu] ?
    val sessionDuration = Duration.ofDays(100)

    // TODO[secu] change cookie ?
    fun authenticateUser(
        user: UserDao.Record,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): AuthResult {
        val sessionId = randomService.id<UserSessionId>()

        // create the session if doesn't exist
        val session = request.getSession(true)
        session.maxInactiveInterval = sessionDuration.seconds.toInt()

        val now = dateService.now()
        val ip = request.remoteAddr
        userSessionLogDao.insert(
            UserSessionLogDao.Record(
                sessionId, session.id, user.id, applicationInstance.deploymentId, now, ip))

        val userSession = UserSession(sessionId, user.id, user.roles)
        val springAuthentication = UsernamePasswordAuthenticationToken(userSession, null, null)
        SecurityContextHolder.getContext().authentication = springAuthentication

        val csrfToken = cookieCsrfTokenRepository.generateToken(request)
        cookieCsrfTokenRepository.saveToken(csrfToken, request, response)
        return AuthResult(userSession, csrfToken.token)
    }

    fun isAuthenticated() =
        SecurityContextHolder.getContext().authentication.let {
            it != null && it !is AnonymousAuthenticationToken && it.isAuthenticated
        }

    fun hasRole(role: Role): Boolean {
        if (!isAuthenticated()) {
            return false
        }
        val userSession = getUserSession()
        return role in userSession.roles
    }

    fun verifyRoleOrFail(role: Role?, logIp: String, logClass: Class<Any>) {
        if (role != null) {
            if (!isAuthenticated()) {
                throw OrgarifSecurityException("$logIp ${logClass.simpleName}")
            }
            val userSession = getUserSession()
            if (role !in userSession.roles) {
                throw OrgarifSecurityException("$userSession $logIp ${logClass.simpleName}")
            }
        }
    }

    fun getUserSession(): UserSession =
        SecurityContextHolder.getContext().authentication.principal.let {
            when (it) {
                // [doc] allows UserSession object evolution without breaking existing sessions
                is Session -> convert(it).session
                // TODO[secu] do 403 if anonymousUser
                is AnonymousAuthenticationToken -> throw AppErrors.NotConnectedUser()
                // TODO[secu] log ?
                else -> throw IllegalStateException("Unexpected principal type ${it.javaClass} $it")
            }
        }

    fun convert(s: Session): SessionConvertion =
        when (s) {
            is UserSession -> SessionConvertion(false, s)
        // [doc] to update a session :
        // is FormerUserSession -> {
        //    logger.info { "Converting session $s" }
        //    val user = userDao.fetch(s.userId) ?: throw IllegalStateException("$s")
        //    SessionConvertion(
        //        true,
        //        UserSession(s.sessionId, s.userId, user.roles)
        //    )
        // }
        }

    fun updateCurrentSession(userSession: UserSession): UserSession {
        val springAuthentication = UsernamePasswordAuthenticationToken(userSession, null, null)
        // [doc] this does save session in database
        SecurityContextHolder.getContext().authentication = springAuthentication
        return userSession
    }
}
