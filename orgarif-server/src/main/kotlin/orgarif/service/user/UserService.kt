package orgarif.service.user

import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.PlainStringPassword
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.repository.user.FormerMailDao
import orgarif.repository.user.UserDao
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
    val formerMailDao: FormerMailDao,
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
                dirtyMail = dirtyMail,
                signupDate = now,
                lastUpdateDate = now)
        userDao.insert(user, hashedPassword)
        notificationService.notify(
            "${user.mail} just suscribed.", NotificationService.Channel.newUser)
        return user
    }

    fun updateMail(userId: UserId, mail: String) {
        val (newMail, newDirtyMail) = cleanMailAndReturnDirty(mail)
        val (currentMail, currentDirtyMail) = userDao.fetchMailAndDirtyMail(userId)
        if (newMail == currentMail) {
            // TODO[tmpl] no double click in UI
            throw IllegalArgumentException("Email didn't change $userId")
        }
        // TODO[tmpl] make logs...
        logger.info { "Update mail $userId $currentMail => $newMail" }
        val now = dateService.now()
        formerMailDao.insert(
            FormerMailDao.Record(randomService.id(), userId, currentMail, currentDirtyMail, now))
        userDao.updateMail(userId, newMail, newDirtyMail, now)
    }

    fun hashPassword(password: PlainStringPassword): HashedPassword {
        require(password.password.isNotBlank()) { "Password is blank" }
        return HashedPassword(passwordEncoder.encode(password.password.trim()))
    }

    fun passwordMatches(verifyPassword: PlainStringPassword, actualPassword: HashedPassword) =
        passwordEncoder.matches(verifyPassword.password.trim(), actualPassword.hash)
}
