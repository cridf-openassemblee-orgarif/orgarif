package orgarif.service

import orgarif.utils.OrgarifStringUtils
import org.apache.tomcat.util.http.fileupload.util.Streams
import java.util.concurrent.atomic.AtomicInteger

class DummyRandomService(idLogService: IdLogService? = null) : RandomService(idLogService) {

    val uuids by lazy {
        Streams
            .asString(javaClass.classLoader.getResourceAsStream("test-uuids"))
            .split("\n")
            .map { OrgarifStringUtils.deserializeUuid(it) }
    }

    val stringIds by lazy {
        Streams
            .asString(javaClass.classLoader.getResourceAsStream("test-string-ids"))
            .split("\n")
    }

    val uuidsCursor = AtomicInteger(0)
    val stringIdCursor = AtomicInteger(0)

    override fun internalUuid() = uuids.getOrNull(uuidsCursor.getAndIncrement())
    // TODO test
        ?: throw RuntimeException("${DummyRandomService::class.java.simpleName} has no more uuids (cursor: ${uuidsCursor.get()})")

    override fun internalRandomString(length: Int): String {
        val id = stringIds.getOrNull(stringIdCursor.getAndIncrement())
        // TODO test
            ?: throw RuntimeException("${DummyRandomService::class.java.simpleName} has no more string ids (cursor: ${stringIdCursor.get()})")
        // TODO check
        if (length > id.length) {
            throw RuntimeException("${DummyRandomService::class.java.simpleName} needs longer string ids (current is ${id.length}")
        }
        return id.substring(0, length)
    }

}