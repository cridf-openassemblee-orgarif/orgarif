package orgarif.serialization

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import orgarif.domain.TestIds.emptyUuid0
import orgarif.domain.TestUuidId
import orgarif.utils.toTypeId

internal class OrgarifUuidIdDeserializerTest {

    @Test
    fun `test OrgarifUuidId deserialization`() {
        assertEquals(
            emptyUuid0.toTypeId<TestUuidId>(),
            Serializer.deserialize<TestUuidId>("\"00000000000000000000000000000000\""))
    }
}
