package orgarif.database.utils

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class SpringLikeYamlConfigUtilsTest {

    val configMap =
        SpringLikeYamlConfigUtils.yamlToMap(
            """
test:
  hi:
changeMeIfYouCan: value 1
    """,
            "changeMeIfYouCan: value 2".trimIndent())

    @Test
    fun `second value erases first value`() {
        assertEquals("value 2", configMap.getValue("changeMeIfYouCan"))
    }

    @Test
    fun `check null value`() {
        assertNull(configMap.getValueOrNull("test.hi"))
    }

    @Test
    fun `value should not be null`() {
        val exceptionThatWasThrown =
            assertThrows(IllegalArgumentException::class.java) { configMap.getValue("test.hi") }
        assertEquals("Value for key \"test.hi\" is null", exceptionThatWasThrown.message)
    }

    @Test
    fun `missing key with getValue()`() {
        assertThrows(NoSuchElementException::class.java) { configMap.getValue("test.coucou") }
    }

    @Test
    fun `missing key with getValueOrNull()`() {
        assertThrows(NoSuchElementException::class.java) { configMap.getValueOrNull("test.coucou") }
    }
}
