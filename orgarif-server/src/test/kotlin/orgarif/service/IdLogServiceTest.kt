package orgarif.service

import orgarif.domain.TestPrefixSecurityString
import orgarif.domain.TestPrefixStringId
import orgarif.domain.TestPrefixUuidId
import orgarif.domain.TestSecurityString
import orgarif.domain.TestStringId
import orgarif.domain.TestUuidId
import orgarif.service.utils.random.DummyRandomService
import orgarif.service.utils.random.IdLogService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class IdLogServiceTest {

    val service = IdLogService()

    @Test
    fun `test ids string`() {
        val randomService = DummyRandomService(service)
        service.enableLogging()
        randomService.id<TestUuidId>()
        randomService.id<TestPrefixUuidId>()
        randomService.stringId<TestStringId>(TestStringId.length)
        randomService.stringId<TestPrefixStringId>(TestStringId.length)
        randomService.securityString<TestSecurityString>(TestStringId.length)
        randomService.securityString<TestPrefixSecurityString>(TestStringId.length)
        assertEquals(
            """
TestUuidId f89ac98cacc54eea98561cc9658a6663
TestPrefixUuidId bf23ea927f8a4e14a9a11b6604f979eb
TestStringId 03LOeGFj5ZibyaqdISrO
TestPrefixStringId rSSPouSEbuXmda1rHUFC
        """
                .trimIndent(),
            service.getIdsString())
    }

    @Test
    fun `exhaust uuids buffer`() {
        val randomService = DummyRandomService(service)
        try {
            try {
                (1..20).forEach { randomService.id<TestUuidId>() }
            } catch (e: Exception) {
                Assertions.fail()
            }
            randomService.id<TestUuidId>()
            Assertions.fail()
        } catch (e: Exception) {
            assertEquals("DummyRandomService has no more uuids (cursor: 21)", e.message)
        }
    }

    @Test
    fun `exhaust string ids buffer`() {
        val randomService = DummyRandomService(service)
        try {
            try {
                (1..20).forEach { randomService.stringId<TestStringId>(TestStringId.length) }
            } catch (e: Exception) {
                Assertions.fail()
            }
            randomService.stringId<TestStringId>(TestStringId.length)
            Assertions.fail()
        } catch (e: Exception) {
            assertEquals("DummyRandomService has no more string ids (cursor: 21)", e.message)
        }
    }
}
