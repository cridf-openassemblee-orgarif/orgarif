package orgarif.service.utils

import org.springframework.stereotype.Service
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.TransactionDefinition
import org.springframework.transaction.support.TransactionTemplate

@Service
class TransactionIsolationService(transactionManager: PlatformTransactionManager) {

    protected val transactionTemplate by lazy {
        TransactionTemplate(transactionManager).apply {
            propagationBehavior = TransactionDefinition.PROPAGATION_REQUIRES_NEW
        }
    }

    protected val transactionTemplateReadOnly by lazy {
        TransactionTemplate(transactionManager).apply {
            propagationBehavior = TransactionDefinition.PROPAGATION_REQUIRED
            isolationLevel = TransactionDefinition.ISOLATION_READ_COMMITTED
        }
    }

    fun <T> execute(task: () -> T): T = transactionTemplate.execute { task() } as T

    fun <T> executeReadOnly(task: () -> T): T = transactionTemplateReadOnly.execute { task() } as T
}
