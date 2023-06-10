package orgarif.domain

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class UriTest {

    @Test
    fun `test Url part concatenation`() {
        assertEquals(Uri("part-1-url/part-2-url"), Uri("part-1-url").resolve("part-2-url"))
        assertEquals(Uri("part-1-url/part-2-url"), Uri("part-1-url/").resolve("part-2-url"))
        assertEquals(Uri("part-1-url/part-2-url"), Uri("part-1-url").resolve("/part-2-url"))
        assertEquals(Uri("part-1-url/part-2-url"), Uri("part-1-url/").resolve("/part-2-url"))
    }

    @Test
    fun `test params appending`() {
        assertEquals(
            Uri("part-1-url/part-2-url?param#anchor"),
            Uri("part-1-url/part-2-url").append("?param#anchor"))
    }
}
