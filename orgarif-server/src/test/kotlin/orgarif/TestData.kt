package orgarif

import orgarif.config.ApplicationConstants
import orgarif.domain.Language
import orgarif.domain.UserId
import orgarif.repository.sql.UserDao
import java.time.LocalDateTime
import java.util.*

object TestData {

    fun dummyUser(userId: UserId) = UserDao.Record(
        id = userId,
        mail = "mail",
        username = "username",
        language = Language.en,
        admin = false,
        signupDate = LocalDateTime.of(2017, 6, 18, 1, 2).atZone(ApplicationConstants.parisZoneId).toInstant(),
        dirtyMail = "dirtyMail"
    )

}
