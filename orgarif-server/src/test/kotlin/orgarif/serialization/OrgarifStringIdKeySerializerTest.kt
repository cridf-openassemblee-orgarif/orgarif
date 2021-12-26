package orgarif.serialization

import org.junit.jupiter.api.Test
import org.skyscreamer.jsonassert.JSONAssert
import orgarif.domain.TestIds.sampleStringId
import orgarif.domain.TestStringId

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
