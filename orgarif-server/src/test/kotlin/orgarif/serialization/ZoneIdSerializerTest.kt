package orgarif.serialization

import java.time.ZoneId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class ZoneIdSerializerTest {

    @Test
    fun test() {
        assertEquals("\"Europe/Paris\"", Serializer.serialize(ZoneId.of("Europe/Paris")))
    }
}
