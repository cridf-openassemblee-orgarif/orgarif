package orgarif

import java.time.LocalDateTime
import orgarif.config.ApplicationConstants
import orgarif.domain.Language
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.repository.UserDao

object TestData {

    // TODO naming fake, sample
    fun dummyUser(userId: UserId) =
        UserDao.Record(
            id = userId,
            mail = "mail",
            username = "username",
            displayName = "displayName",
            language = Language.en,
            roles = setOf(Role.user),
            signupDate =
                LocalDateTime.of(2017, 6, 18, 1, 2)
                    .atZone(ApplicationConstants.parisZoneId)
                    .toInstant(),
            dirtyMail = "dirtyMail",
            formerMails = emptyList())
}
