package orgarif.service.user

import orgarif.domain.AuthResult
import orgarif.domain.UserSession
import orgarif.domain.UserSessionId
import orgarif.repository.sql.UserDao
import orgarif.repository.sql.UserSessionLogDao
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.RandomService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.stereotype.Service
import java.time.Duration
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class UserSessionService(val cookieCsrfTokenRepository: CookieCsrfTokenRepository,
                         val userDao: UserDao,
                         val ipService: IpService,
                         val userSessionLogDao: UserSessionLogDao,
                         val applicationInstance: ApplicationInstance,
                         val dateService: DateService,
                         val randomService: RandomService) {

    // TODO[secu] ?
    val sessionDuration = Duration.ofDays(100)

    // TODO[secu] change cookie ?
    fun authenticateUser(user: UserDao.Record,
                         request: HttpServletRequest,
                         response: HttpServletResponse): AuthResult {
        val sessionId = UserSessionId(randomService.randomUUID())

        // create the session if doesn't exist
        val session = request.getSession(true)
        session.maxInactiveInterval = sessionDuration.seconds.toInt()

        val now = dateService.now()
        val ip = ipService.getClientIp(request)
        userSessionLogDao.insert(UserSessionLogDao.Record(sessionId, session.id, user.id,
                applicationInstance.deploymentId, now, ip))

        val userSession = UserSession(sessionId, user.id)
        val springAuthentication = UsernamePasswordAuthenticationToken(userSession, null, null)
        SecurityContextHolder.getContext().authentication = springAuthentication

        val csrfToken = cookieCsrfTokenRepository.generateToken(request)
        cookieCsrfTokenRepository.saveToken(csrfToken, request, response)
        return AuthResult(userSession, csrfToken.token)
    }

}