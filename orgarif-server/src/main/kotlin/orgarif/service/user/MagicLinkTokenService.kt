package orgarif.service.user

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.domain.UserId
import orgarif.repository.MagicLinkTokenDao
import orgarif.repository.UserDao
import orgarif.service.DateService
import java.math.BigInteger
import java.security.SecureRandom
import java.time.Duration
import java.time.temporal.ChronoUnit
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class MagicLinkTokenService(
    val magicLinkTokenDao: MagicLinkTokenDao,
    val userSessionService: UserSessionService,
    val userDao: UserDao,
    val dateService: DateService
) {

    private val logger = KotlinLogging.logger {}

    // TODO[magictoken] is going in database too
    // use a shorter validity + display a clear message on the front when it became invalid
//    val validityDuration = Duration.of(15, ChronoUnit.MINUTES)
    val validityDuration = Duration.of(24, ChronoUnit.HOURS)

    fun createToken(userId: UserId): String {
        val token = BigInteger(128, SecureRandom()).toString(16)
        magicLinkTokenDao.insert(MagicLinkTokenDao.Record(token, userId, dateService.now(), true))
        return token
    }

    fun connectUser(
        magicToken: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    ) {
        val token = magicLinkTokenDao.fetchOrNull(magicToken)
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
        val user = userDao.fetch(token.userId) ?: throw IllegalArgumentException("No user for token $token")
        userSessionService.authenticateUser(user, request, response)
        // TODO[magictoken] update to invalidate ?? if not, doc
    }

    fun invalidate(magicToken: String) {
        magicLinkTokenDao.updateValidity(magicToken, false)
    }

}