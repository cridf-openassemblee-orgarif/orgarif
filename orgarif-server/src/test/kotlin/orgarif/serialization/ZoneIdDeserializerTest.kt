package orgarif.serialization

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.time.ZoneId

internal class ZoneIdDeserializerTest {

    @Test
    fun test() {
        assertEquals(ZoneId.of("Europe/Paris"), Serializer.deserialize<ZoneId>("\"Europe/Paris\""))
    }
}