package orgarif.serialization

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import orgarif.domain.TestIds.sampleStringId
import orgarif.domain.TestStringId
import orgarif.utils.toTypeId

internal class OrgarifStringIdSerializerTest {

    @Test
    fun `test DeviceId serialization`() {
        val id = sampleStringId.toTypeId<TestStringId>()
        assertEquals("\"$sampleStringId\"", Serializer.serialize(id))
    }
}
