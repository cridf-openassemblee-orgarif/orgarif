package orgarif.serialization

import java.time.LocalDate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class LocalDateSerializerTest {

    @Test
    fun testSerialization() {
        assertEquals("\"2017-06-18\"", Serializer.serialize(LocalDate.of(2017, 6, 18)))
    }
}
