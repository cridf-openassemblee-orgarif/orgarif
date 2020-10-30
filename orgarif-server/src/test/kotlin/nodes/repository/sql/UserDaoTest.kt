package orgarif.repository.sql

import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.UserId
import orgarif.error.MailAlreadyRegisteredException
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import java.time.Instant
import java.util.*

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner::class)
internal class UserDaoTest {

    @Autowired
    lateinit var userDao: UserDao

    @Ignore
    @Test
    fun `test conflict`() {
        try {
            userDao.insert(UserDao.Record(
                    id = UserId(UUID.randomUUID()),
                    mail = "test",
                    username = "test",
                    displayName = "test",
                    language = Language.en,
                    admin = false,
                    signupDate = Instant.now(),
                    dirtyMail = null
            ), HashedPassword("sdv"))
            throw RuntimeException()
        } catch (e: MailAlreadyRegisteredException) {
        }
    }

}
