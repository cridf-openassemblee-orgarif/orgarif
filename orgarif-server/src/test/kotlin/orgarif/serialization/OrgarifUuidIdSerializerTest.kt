package orgarif.serialization

import orgarif.domain.TestIds.emptyUuid0
import orgarif.domain.TestUuidId
import orgarif.utils.toTypeId
import org.junit.jupiter.api.Test
import org.skyscreamer.jsonassert.JSONAssert

internal class OrgarifUuidIdSerializerTest {

    @Test
    fun `test OrgarifUuidId serialization`() {
        JSONAssert.assertEquals(
            "\"00000000000000000000000000000000\"",
            Serializer.serialize(emptyUuid0.toTypeId<TestUuidId>()),
            true)
    }
}
