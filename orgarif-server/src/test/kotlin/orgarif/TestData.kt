package orgarif

import java.time.LocalDateTime
import orgarif.config.ApplicationConstants
import orgarif.domain.Language
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.repository.user.UserDao

object TestData {

    // TODO[tmpl] naming fake, sample
    fun dummyUser(userId: UserId): UserDao.Record {
        val date =
            LocalDateTime.of(2017, 6, 18, 1, 2).atZone(ApplicationConstants.parisZoneId).toInstant()
        return UserDao.Record(
            id = userId,
            mail = "mail",
            displayName = "displayName",
            language = Language.En,
            roles = setOf(Role.User),
            signupDate = date,
            lastUpdate = date)
    }
}
