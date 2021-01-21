package orgarif.service

import org.junit.Assert
import org.junit.Assert.assertEquals
import org.junit.Test
import orgarif.domain.OrganismeId
import orgarif.domain.UserId

internal class IdCreationLoggerServiceTest {

    val service = IdCreationLoggerService()

    @Test
    fun `test ids string`() {
        val randomService = TestRandomService(service)
        service.enableLogging()
        randomService.id<UserId>()
        randomService.id<OrganismeId>()
        randomService.id<UserId>()
        assertEquals(
            """
            UserId f89ac98cacc54eea98561cc9658a6663
            OrganismeId bf23ea927f8a4e14a9a11b6604f979eb
            UserId 35454bea9ee04afab3dbfdde0dfe4c30
        """.trimIndent(),
            service.getIdsString()
        )
    }

    @Test
    fun `expected exception`() {
        val randomService = TestRandomService(service)
        try {

            try {
                (1..20).forEach {
                    randomService.id<UserId>()
                }
            } catch (e: Exception) {
                Assert.fail()
            }
            randomService.id<UserId>()
            Assert.fail()
        } catch (e: Exception) {
            assertEquals("TestRandomService has no more id (cursor: 20)", e.message)
        }
    }
}