package orgarif.serialization

import java.time.LocalDate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class LocalDateDeserializerTest {

    @Test
    fun testDeserialization() {
        assertEquals(LocalDate.of(2017, 6, 18), Serializer.deserialize<LocalDate>("\"2017-06-18\""))
    }
}
