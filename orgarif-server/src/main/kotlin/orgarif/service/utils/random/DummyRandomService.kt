package orgarif.service.utils.random

import java.util.concurrent.atomic.AtomicInteger
import orgarif.utils.uuid

class DummyRandomService(idLogService: IdLogService? = null) : RandomService(idLogService) {

    private val uuids by lazy {
        javaClass.classLoader.getResource("test-uuids").readText().split("\n").map { it.uuid() }
    }

    private val stringIds by lazy {
        javaClass.classLoader.getResource("test-string-ids").readText().split("\n")
    }

    private val uuidsCursor = AtomicInteger(0)
    private val stringIdCursor = AtomicInteger(0)

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
