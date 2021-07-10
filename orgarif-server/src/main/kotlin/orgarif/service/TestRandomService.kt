package orgarif.service

import org.apache.tomcat.util.http.fileupload.util.Streams
import org.springframework.stereotype.Service
import orgarif.domain.OrgarifUuidId
import orgarif.utils.OrgarifStringUtils
import orgarif.utils.toTypeId
import java.lang.RuntimeException
import java.math.BigInteger
import java.security.SecureRandom
import java.util.*
import java.util.concurrent.atomic.AtomicInteger

class TestRandomService(idCreationLoggerService: IdCreationLoggerService) : RandomService(idCreationLoggerService) {

    val ids by lazy {
        Streams
            .asString(javaClass.classLoader.getResourceAsStream("test-ids"))
            .split("\n")
            .map { OrgarifStringUtils.deserializeUuid(it) }
    }

    val cursor = AtomicInteger(-1)

    override fun uuid() = ids.getOrNull(cursor.incrementAndGet())
    // TODO test
        ?: throw RuntimeException("TestRandomService has no more id (cursor: ${cursor.get()})")

}