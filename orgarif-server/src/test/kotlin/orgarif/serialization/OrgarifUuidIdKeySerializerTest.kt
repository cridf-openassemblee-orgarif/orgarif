package orgarif.serialization

import org.junit.jupiter.api.Test
import org.skyscreamer.jsonassert.JSONAssert
import orgarif.domain.TestIds.emptyUuid0
import orgarif.domain.TestUuidId
import orgarif.utils.toTypeId

internal class OrgarifUuidIdKeySerializerTest {

    @Test
    fun testSerialization() {
        val map = mapOf(emptyUuid0.toTypeId<TestUuidId>() to "coucou")
        val json = Serializer.serialize(map)
        JSONAssert.assertEquals(
            """
            {
                "00000000000000000000000000000000": "coucou"
            }
            """,
            json,
            true)
    }
}
