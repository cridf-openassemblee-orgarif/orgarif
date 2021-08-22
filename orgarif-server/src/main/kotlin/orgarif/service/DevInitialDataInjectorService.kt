package orgarif.service

import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.Role
import orgarif.repository.UserDao
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
// TODO naming fake / sample
class DevInitialDataInjectorService(
    @Value("\${mail.devDestination}") val developerDestinationMail: String,
    val userDao: UserDao,
    val dateService: DateService,
    val randomService: RandomService,
    val passwordEncoder: PasswordEncoder
) {

    fun initiateDevUsers() {
        val (mailPrefix, mailSuffix) = run {
            // FIXME double + if some + in conf (which is the case...) !
            val arobaseIndex = developerDestinationMail.indexOf('@')
            val mailPrefix = developerDestinationMail.substring(0, arobaseIndex)
            val mailSuffix = developerDestinationMail.substring(arobaseIndex)
            mailPrefix to mailSuffix
        }
        insertUser("user", false, mailPrefix, mailSuffix)
        insertUser("admin", true, mailPrefix, mailSuffix)
    }

    private fun insertUser(username: String, admin: Boolean, mailPrefix: String, mailSuffix: String) {
        if (userDao.fetchByUsername(username) == null) {
            userDao.insert(
                UserDao.Record(
                    id = randomService.id(),
                    mail = "$mailPrefix+$username$mailSuffix",
                    username = username,
                    displayName = username,
                    language = Language.en,
                    signupDate = dateService.now(),
                    roles = setOf(Role.user).let { if (admin) it + Role.admin else it },
                    dirtyMail = null,
                    formerMails = emptyList()
                ), HashedPassword(passwordEncoder.encode(username))
            )
        }
    }

}