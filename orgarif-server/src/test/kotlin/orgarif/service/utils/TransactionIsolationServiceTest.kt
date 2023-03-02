package orgarif.service.utils

import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.support.TransactionTemplate
import orgarif.TestData
import orgarif.domain.HashedPassword
import orgarif.repository.user.UserDao
import orgarif.service.utils.random.RandomService

@SpringBootTest
@ActiveProfiles("test")
internal class TransactionIsolationServiceTest(
    @Autowired val transactionIsolationService: TransactionIsolationService,
    @Autowired val userDao: UserDao,
    @Autowired val randomService: RandomService,
    @Autowired val transactionManager: PlatformTransactionManager
) {

    @Test
    fun `test isolated transaction`() {
        /* Execution:
            start transaction 1
                insert
                start transaction 2
                    insert
                fail

        => transaction number 2 must commit, transaction number 1 must fail
        * for first transaction, the propagation behavior is default (PROPAGATION_REQUIRED) ; it could also have been
        PROPAGATION_REQUIRES_NEW or PROPAGATION_NESTED
         */

        val recordNotIsolated = TestData.dummyUser(randomService.id()).copy(mail = "not isolated")
        val recordIsolated = TestData.dummyUser(randomService.id()).copy(mail = "isolated")
        val transactionTemplate = TransactionTemplate(transactionManager)
        try {
            transactionTemplate.execute {
                userDao.insert(recordNotIsolated, HashedPassword(""))
                transactionIsolationService.execute {
                    userDao.insert(recordIsolated, HashedPassword(""))
                }
                throw RuntimeException("my test exception")
            }
        } catch (e: Exception) {
            if (e.message != "my test exception") {
                throw e
            }
        }
        assertNotNull(userDao.fetchOrNullByMail("isolated"))
        assertNull(userDao.fetchOrNullByMail("not isolated"))
    }
}
