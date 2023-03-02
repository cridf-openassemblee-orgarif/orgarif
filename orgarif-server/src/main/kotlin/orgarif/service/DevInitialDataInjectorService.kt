package orgarif.service

import orgarif.domain.Language
import orgarif.domain.PlainStringPassword
import orgarif.domain.Role
import orgarif.repository.user.UserDao
import orgarif.service.user.UserService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
// TODO[tmpl] naming fake / sample
class DevInitialDataInjectorService(
    @Value("\${mail.devDestination}") val developerDestinationMail: String,
    val userDao: UserDao,
    val dateService: DateService,
    val randomService: RandomService,
    val userService: UserService
) {

    fun initiateDevUsers() {
        insertUser("user", false)
        insertUser("admin", true)
    }

    private fun insertUser(
        username: String,
        admin: Boolean,
    ) {
        val mail = devUserMail(username)
        if (userDao.fetchOrNullByMail(mail) == null) {
            val now = dateService.now()
            userDao.insert(
                UserDao.Record(
                    id = randomService.id(),
                    mail = mail,
                    username = username,
                    displayName = username,
                    language = Language.en,
                    roles = setOf(Role.user).let { if (admin) it + Role.admin else it },
                    signupDate = now,
                    lastUpdate = now),
                userService.hashPassword(PlainStringPassword(username)))
        }
    }

    fun devUserMail(username: String): String {
        // FIXME[tmpl] double + if some + in conf (which is the case...) !
        val arobaseIndex = developerDestinationMail.indexOf('@')
        val mailPrefix = developerDestinationMail.substring(0, arobaseIndex)
        val mailSuffix = developerDestinationMail.substring(arobaseIndex)
        return "$mailPrefix+$username$mailSuffix"
    }
}
