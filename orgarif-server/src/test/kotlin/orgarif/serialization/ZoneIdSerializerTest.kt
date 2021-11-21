package orgarif.serialization

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.time.ZoneId

internal class ZoneIdSerializerTest {

    @Test
    fun test() {
        assertEquals("\"Europe/Paris\"", Serializer.serialize(ZoneId.of("Europe/Paris")))
    }
}