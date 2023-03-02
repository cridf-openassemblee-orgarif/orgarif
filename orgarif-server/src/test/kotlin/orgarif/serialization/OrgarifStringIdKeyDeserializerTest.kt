package orgarif.serialization

import orgarif.domain.TestIds.sampleStringId
import orgarif.domain.TestStringId
import orgarif.utils.toTypeId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class OrgarifStringIdKeyDeserializerTest {

    @Test
    fun testDeserialization() {
        val json =
            """
            {
                "$sampleStringId": "coucou"
            }
            """
        val map = Serializer.deserialize<Map<TestStringId, String>>(json)
        val expectedMap = mapOf(sampleStringId.toTypeId<TestStringId>() to "coucou")
        assertEquals(expectedMap, map)
    }
}
