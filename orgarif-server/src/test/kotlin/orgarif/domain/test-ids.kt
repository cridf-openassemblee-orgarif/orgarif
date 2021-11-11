package orgarif.domain

import java.util.*

data class TestUuidId(override val rawId: UUID) : OrgarifUuidId()

@Prefix("test_prefix")
data class TestPrefixUuidId(override val rawId: UUID) : OrgarifUuidId()

data class TestStringId(override val rawId: String) : OrgarifStringId(rawId) {
    companion object {
        val length = 40
    }

    override fun length() = length
}

@Prefix("test_prefix")
data class TestPrefixStringId(override val rawId: String) : OrgarifStringId(rawId) {
    override fun length() = TestStringId.length
}
