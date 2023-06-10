package orgarif.service.utils

import java.util.UUID
import org.jooq.DSLContext
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.support.TransactionTemplate

@SpringBootTest
@ActiveProfiles("test")
internal class TransactionIsolationServiceTest(
    @Autowired val transactionIsolationService: TransactionIsolationService,
    @Autowired val jooq: DSLContext,
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
        jooq.execute(
            """
CREATE TABLE transaction_isolation_test
(
    id UUID PRIMARY KEY,
    text VARCHAR(255) NOT NULL
);
        """
                .trimIndent())
        val transactionTemplate = TransactionTemplate(transactionManager)
        try {
            transactionTemplate.execute {
                val notIsolated =
                    "insert into transaction_isolation_test (id, text) values ('${UUID.randomUUID()}', 'not isolated');"
                jooq.execute(notIsolated)
                transactionIsolationService.execute {
                    // isolated
                    val isolated =
                        "insert into transaction_isolation_test (id, text) values ('${UUID.randomUUID()}', 'isolated');"
                    jooq.execute(isolated)
                }
                throw RuntimeException("my test exception")
            }
        } catch (e: Exception) {
            if (e.message != "my test exception") {
                throw e
            }
        }
        assertEquals(
            setOf("isolated"),
            jooq
                .resultQuery("select text from transaction_isolation_test;")
                .fetch()
                .map { it.get("text") }
                .toSet())
    }
}
