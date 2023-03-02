package orgarif.service

import com.google.common.io.CharStreams
import orgarif.utils.OrgarifStringUtils
import java.io.InputStreamReader
import java.util.concurrent.atomic.AtomicInteger

class DummyRandomService(idLogService: IdLogService? = null) : RandomService(idLogService) {

    val uuids by lazy {
        CharStreams.toString(
                InputStreamReader(
                    javaClass.classLoader.getResourceAsStream("test-uuids"), Charsets.UTF_8))
            .split("\n")
            .map { OrgarifStringUtils.deserializeUuid(it) }
    }

    val stringIds by lazy {
        CharStreams.toString(
                InputStreamReader(
                    javaClass.classLoader.getResourceAsStream("test-string-ids"), Charsets.UTF_8))
            .split("\n")
    }

    val uuidsCursor = AtomicInteger(0)
    val stringIdCursor = AtomicInteger(0)

    override fun uuid() =
        uuids.getOrNull(uuidsCursor.getAndIncrement())
        // TODO[tmpl] test
        ?: throw RuntimeException(
                "${DummyRandomService::class.java.simpleName} has no more uuids (cursor: ${uuidsCursor.get()})")

    override fun randomString(length: Int): String {
        val id =
            stringIds.getOrNull(stringIdCursor.getAndIncrement())
            // TODO[tmpl] test
            ?: throw RuntimeException(
                    "${DummyRandomService::class.java.simpleName} has no more string ids (cursor: ${stringIdCursor.get()})")
        // TODO[tmpl] check
        if (length > id.length) {
            throw RuntimeException(
                "${DummyRandomService::class.java.simpleName} needs longer string ids (current is ${id.length}")
        }
        return id.substring(0, length)
    }
}
