package orgarif.service

import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.UserId
import orgarif.repository.sql.UserDao
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class DevDataInjectorService(@Value("\${developerMail}") val developerMail: String,
                             val userDao: UserDao,
                             val dateService: DateService,
                             val randomService: RandomService,
                             val passwordEncoder: PasswordEncoder) {

    fun initiateDevUsers() {
        val (mailPrefix, mailSuffix) = run {
            val arobaseIndex = developerMail.indexOf('@')
            val mailPrefix = developerMail.substring(0, arobaseIndex)
            val mailSuffix = developerMail.substring(arobaseIndex)
            mailPrefix to mailSuffix
        }
        insertUser("dev", false, mailPrefix, mailSuffix)
        insertUser("admin", false, mailPrefix, mailSuffix)
    }

    private fun insertUser(username: String, admin: Boolean, mailPrefix: String, mailSuffix: String) {
        if (userDao.fetchByUsername(username) == null) {
            userDao.insert(UserDao.Record(
                    id = UserId(randomService.randomUUID()),
                    mail = "$mailPrefix+$username$mailSuffix",
                    username = username,
                    displayName = username,
                    language = Language.en,
                    signupDate = dateService.now(),
                    admin = admin,
                    dirtyMail = null
            ), HashedPassword(passwordEncoder.encode(username)))
        }
    }

}