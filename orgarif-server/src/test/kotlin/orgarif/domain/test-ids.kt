package orgarif.domain

import java.util.*

object TestIds {
    val emptyUuid0 = UUID.fromString("00000000-0000-0000-0000-000000000000")

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
