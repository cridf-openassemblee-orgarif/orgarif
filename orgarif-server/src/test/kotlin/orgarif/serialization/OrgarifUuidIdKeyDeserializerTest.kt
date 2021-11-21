package orgarif.serialization

import orgarif.domain.TestIds.emptyUuid0
import orgarif.domain.TestUuidId
import orgarif.utils.toTypeId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class OrgarifUuidIdKeyDeserializerTest {

    @Test
    fun testDeserialization() {
        val json = """
            {
                "00000000000000000000000000000000": "coucou"
            }
            """
        val map = Serializer.deserialize<Map<TestUuidId, String>>(json)
        val expectedMap = mapOf(emptyUuid0.toTypeId<TestUuidId>() to "coucou")
        assertEquals(expectedMap, map)
    }

}