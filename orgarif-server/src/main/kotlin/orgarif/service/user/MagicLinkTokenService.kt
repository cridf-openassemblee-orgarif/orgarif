package orgarif.service.user

import orgarif.domain.UserId
import orgarif.repository.user.MagicLinkTokenDao
import orgarif.repository.user.UserDao
import orgarif.service.DateService
import java.math.BigInteger
import java.security.SecureRandom
import java.time.Duration
import java.time.temporal.ChronoUnit
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class MagicLinkTokenService(
    private val magicLinkTokenDao: MagicLinkTokenDao,
    private val userSessionService: UserSessionService,
    private val userDao: UserDao,
    private val dateService: DateService
) {

    private val logger = KotlinLogging.logger {}

    // TODO[tmpl][magictoken] is going in database too
    // use a shorter validity + display a clear message on the front when it became invalid
    //    val validityDuration = Duration.of(15, ChronoUnit.MINUTES)
    val validityDuration = Duration.of(24, ChronoUnit.HOURS)

    fun createToken(userId: UserId): String {
        val token = BigInteger(128, SecureRandom()).toString(16)
        val now = dateService.now()
        magicLinkTokenDao.insert(MagicLinkTokenDao.Record(token, userId, true, now, now))
        return token
    }

    fun connectUser(
        magicToken: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    ) {
        val token =
            magicLinkTokenDao.fetchOrNull(magicToken)
                ?: run {
                    logger.warn { "Token doesn't exist $magicToken" }
                    return
                }
        if (!token.validity) {
            logger.warn { "Invalidated token $token" }
            return
        }
        if (token.creationDate + validityDuration < dateService.now()) {
            logger.info { "Out of date token $token" }
            return
        }
        val user = userDao.fetch(token.userId)
        userSessionService.authenticateUser(user, request, response)
        // TODO[tmpl][magictoken] update to invalidate ?? if not, doc
    }

    fun invalidate(magicToken: String) {
        magicLinkTokenDao.updateValidity(magicToken, false, dateService.now())
    }
}
