package orgarif.serialization

import java.time.ZoneId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class ZoneIdDeserializerTest {

    @Test
    fun test() {
        assertEquals(ZoneId.of("Europe/Paris"), Serializer.deserialize<ZoneId>("\"Europe/Paris\""))
    }
}
