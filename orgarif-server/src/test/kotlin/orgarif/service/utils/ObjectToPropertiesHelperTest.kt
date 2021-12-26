package orgarif.service.utils

internal class ObjectToPropertiesHelperTest {

    fun assertEquals(expected: List<Pair<String, String>>, value: List<Pair<String, String>>) {
        if (expected != value) {
            val diff1 = expected - value
            val diff2 = value - expected
            if (diff1.isNotEmpty() || diff2.isNotEmpty()) {
                throw AssertionError(
                    """
                    Found in expected and not in value :
                    ${diff1.map { "${it.first}: ${it.second}" }}
                    Found in value and not in expected :
                    ${diff2.map { "${it.first}: ${it.second}" }}
                """.trimIndent())
            }
            throw AssertionError("Lists contains the same items - order difference")
        }
    }
}
