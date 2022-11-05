package orgarif.service

import java.util.concurrent.atomic.AtomicInteger
import orgarif.utils.OrgarifStringUtils

class DummyRandomService(idLogService: IdLogService? = null) : RandomService(idLogService) {

    val uuids by lazy {
        javaClass.classLoader.getResource("test-uuids").readText().split("\n").map {
            OrgarifStringUtils.deserializeUuid(it)
        }
    }

    val stringIds by lazy {
        javaClass.classLoader.getResource("test-string-ids").readText().split("\n")
    }

    val uuidsCursor = AtomicInteger(0)
    val stringIdCursor = AtomicInteger(0)

    override fun uuid() =
        uuids.getOrNull(uuidsCursor.getAndIncrement())
        // TODO[fmk] test
        ?: throw RuntimeException(
                "${DummyRandomService::class.java.simpleName} has no more uuids (cursor: ${uuidsCursor.get()})")

    override fun randomString(length: Int): String {
        val id =
            stringIds.getOrNull(stringIdCursor.getAndIncrement())
            // TODO[fmk] test
            ?: throw RuntimeException(
                    "${DummyRandomService::class.java.simpleName} has no more string ids (cursor: ${stringIdCursor.get()})")
        // TODO[fmk] check
        if (length > id.length) {
            throw RuntimeException(
                "${DummyRandomService::class.java.simpleName} needs longer string ids (current is ${id.length}")
        }
        return id.substring(0, length)
    }
}
