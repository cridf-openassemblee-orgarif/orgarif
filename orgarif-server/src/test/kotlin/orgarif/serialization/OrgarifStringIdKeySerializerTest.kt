package orgarif.serialization

import orgarif.domain.TestIds.sampleStringId
import orgarif.domain.TestStringId
import org.junit.jupiter.api.Test
import org.skyscreamer.jsonassert.JSONAssert

internal class OrgarifStringIdKeySerializerTest {

    @Test
    fun testSerialization() {
        val map = mapOf(TestStringId(sampleStringId) to "coucou")
        val json = Serializer.serialize(map)
        JSONAssert.assertEquals(
            """
            {
                "$sampleStringId": "coucou"
            }
            """,
            json,
            true)
    }
}
