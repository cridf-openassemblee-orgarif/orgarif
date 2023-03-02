package orgarif.serialization

import orgarif.domain.TestIds.sampleStringId
import orgarif.domain.TestStringId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class OrgarifStringIdDeserializerTest {

    @Test
    fun `test OrgarifStringId deserialization`() {
        assertEquals(
            TestStringId(sampleStringId),
            Serializer.deserialize<TestStringId>("\"$sampleStringId\""))
    }
}
