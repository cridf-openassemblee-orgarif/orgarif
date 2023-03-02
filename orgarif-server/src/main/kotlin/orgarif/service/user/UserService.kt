package orgarif.service.user

import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.PlainStringPassword
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.domain.UserMailLogType
import orgarif.repository.user.UserDao
import orgarif.repository.user.UserMailLogDao
import orgarif.service.DateService
import orgarif.service.NotificationService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils
import mu.KotlinLogging
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    val userDao: UserDao,
    val userMailLogDao: UserMailLogDao,
    val dateService: DateService,
    val randomService: RandomService,
    val notificationService: NotificationService,
    val passwordEncoder: PasswordEncoder
) {

    private val logger = KotlinLogging.logger {}

    companion object {
        fun cleanMail(dirtyMail: String) =
            dirtyMail
                .lowercase()
                .replace(" ", "")
                // [doc] accents are supposed to be supported by the RFC
                // but in practice it's always a user input error
                .let { OrgarifStringUtils.removeAccents(it) }

        fun cleanMailAndReturnDirty(dirtyMail: String) = let {
            val clean = cleanMail(dirtyMail)
            // [doc] is supposed to be trimed before
            val dirty = dirtyMail.trim()
            clean to (if (dirty != clean) dirty else null)
        }
    }

    fun createUser(
        mail: String,
        hashedPassword: HashedPassword,
        displayName: String,
        language: Language,
    ): UserDao.Record {
        val (cleanMail, dirtyMail) = cleanMailAndReturnDirty(mail)
        val now = dateService.now()
        val user =
            UserDao.Record(
                id = randomService.id(),
                mail = cleanMail,
                username = null,
                displayName = displayName.trim(),
                language = language,
                roles = setOf(Role.user),
                signupDate = now,
                lastUpdateDate = now)
        userDao.insert(user, hashedPassword)
        if (dirtyMail != null) {
            userMailLogDao.insert(
                UserMailLogDao.Record(
                    randomService.id(), user.id, dirtyMail, UserMailLogType.dirtyMail, now))
        }
        notificationService.notify(
            "${user.mail} just suscribed.", NotificationService.Channel.newUser)
        return user
    }

    fun updateMail(userId: UserId, mail: String) {
        val (newMail, newDirtyMail) = cleanMailAndReturnDirty(mail)
        val formerMail = userDao.fetchMail(userId)
        val now = dateService.now()
        // [doc] Is done first on purpose. If user has tried to use é@gmail.com, it has been change
        // to e@gmail.com, if he retries we should re-log
        // TODO[tmpl] need integration tests !
        if (newDirtyMail != null) {
            userMailLogDao.insert(
                UserMailLogDao.Record(
                    randomService.id(), userId, newDirtyMail, UserMailLogType.dirtyMail, now))
        }
        if (newMail == formerMail) {
            // TODO[tmpl] user should be warned (maybe he tried a cleaned email)
            // (can be an accidental double click too)
            return
        }
        logger.info { "Update mail $userId $formerMail => $newMail" }
        userDao.updateMail(userId, newMail, now)
        userMailLogDao.insert(
            UserMailLogDao.Record(
                randomService.id(), userId, formerMail, UserMailLogType.formerMail, now))
    }

    fun hashPassword(password: PlainStringPassword): HashedPassword {
        require(password.password.isNotBlank()) { "Password is blank" }
        return HashedPassword(passwordEncoder.encode(password.password.trim()))
    }

    fun passwordMatches(verifyPassword: PlainStringPassword, actualPassword: HashedPassword) =
        passwordEncoder.matches(verifyPassword.password.trim(), actualPassword.hash)
}
