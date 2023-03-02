package orgarif.controller

import orgarif.controller.IndexController.Companion.extractDomain
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class IndexControllerCompanionTest() {

    @Test
    fun `test url domain extraction`() {
        assertEquals("localhost", extractDomain("http://localhost:3200"))
        assertEquals("localhost", extractDomain("http://localhost:3200/"))
        assertEquals("localhost", extractDomain("http://localhost:3200/djvodsjv"))
        assertEquals("localhost", extractDomain("http://localhost:3200/djvodsjv/dsvsdvds"))
        assertEquals("localhost", extractDomain("https://localhost:3200"))
        assertEquals("localhost", extractDomain("https://localhost:3200/"))
        assertEquals("localhost", extractDomain("https://localhost:3200/djvodsjv"))
        assertEquals("localhost", extractDomain("https://localhost:3200/djvodsjv/dsvsdvds"))
    }
}
