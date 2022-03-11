package orgarif.controller

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import orgarif.controller.IndexController.Companion.extractDomain

internal class IndexControllerCompanionTest() {

    @Test
    fun `test url domain extraction`() {
        assertEquals("http://localhost", extractDomain("http://localhost:3300"))
        assertEquals("http://localhost", extractDomain("http://localhost:3300/"))
        assertEquals("http://localhost", extractDomain("http://localhost:3300/djvodsjv"))
        assertEquals("http://localhost", extractDomain("http://localhost:3300/djvodsjv/dsvsdvds"))
        assertEquals("https://localhost", extractDomain("https://localhost:3300"))
        assertEquals("https://localhost", extractDomain("https://localhost:3300/"))
        assertEquals("https://localhost", extractDomain("https://localhost:3300/djvodsjv"))
        assertEquals("https://localhost", extractDomain("https://localhost:3300/djvodsjv/dsvsdvds"))
    }
}
