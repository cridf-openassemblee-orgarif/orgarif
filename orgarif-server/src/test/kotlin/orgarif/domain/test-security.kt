package orgarif.domain

data class TestSecurityString(override val rawString: String) : OrgarifSecurityString(rawString) {
    override fun length() = TestStringId.length
}

@Prefix("test_prefix")
data class TestPrefixSecurityString(override val rawString: String) :
    OrgarifSecurityString(rawString) {
    override fun length() = TestStringId.length
}
