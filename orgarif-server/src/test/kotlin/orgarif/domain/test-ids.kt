package orgarif.domain

import java.util.UUID
import orgarif.utils.uuid

object TestIds {
    val emptyUuid0 = "00000000000000000000000000000000".uuid()

    val sampleStringId = "my-string-id -------"
}

data class TestUuidId(override val rawId: UUID) : OrgarifUuidId()

@Prefix("test_prefix") data class TestPrefixUuidId(override val rawId: UUID) : OrgarifUuidId()

data class TestStringId(override val rawId: String) : OrgarifStringId(rawId) {
    companion object {
        val length = 20
    }

    override fun length() = length
}

@Prefix("test_prefix")
data class TestPrefixStringId(override val rawId: String) : OrgarifStringId(rawId) {
    override fun length() = TestStringId.length
}
