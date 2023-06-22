package orgarif.utils

import java.util.UUID
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class ExtensionsKtTest {
    val uuid = UUID.fromString("29d902e1-c234-4e54-b305-8b7a885a560e")

    @Test
    fun `uuid deserialization with no hyphen`() {
        assertEquals(uuid, "29d902e1c2344e54b3058b7a885a560e".uuid())
    }

    @Test
    fun `uuid deserialization with hyphens`() {
        assertEquals(uuid, "29d902e1-c234-4e54-b305-8b7a885a560e".uuid())
    }
}
