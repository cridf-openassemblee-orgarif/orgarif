package orgarif.utils

import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.UUID
import org.json.JSONObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.skyscreamer.jsonassert.JSONAssert
import orgarif.domain.PlainStringPassword
import orgarif.domain.TestPrefixSecurityString
import orgarif.domain.TestPrefixStringId
import orgarif.domain.TestPrefixUuidId
import orgarif.domain.TestSecurityString
import orgarif.domain.TestSerializeAsString
import orgarif.domain.TestStringId
import orgarif.domain.TestUuidId
import orgarif.serialization.Serializer
import orgarif.service.DummyRandomService
import orgarif.utils.OrgarifStringUtils.filteredPassword

// TODO test maps keys
internal class SerializerTest {

    @Test
    fun `test null field is not present in json`() {
        data class Test(val first: String, val second: String?)
        assertEquals("{\"first\":\"bonjour\"}", Serializer.serialize(Test("bonjour", null)))
    }

    //    @Test
    //    fun `test null UUID`() {
    //        data class Test(val first: String, val uuid: UUID?)
    //        assertEquals("{\"first\":\"bonjour\"}", serialize(Test("bonjour", null)))
    //    }

    // TODO test some SerializeAsString
    // TODO test some StringId
    data class SerializationTest(
        val instant: Instant,
        val testSerializeAsString: TestSerializeAsString,
        val testUuidId: TestUuidId,
        val testPrefixUuidId: TestPrefixUuidId,
        val testStringId: TestStringId,
        val testPrefixStringId: TestPrefixStringId,
        val testSecurityString: TestSecurityString,
        val testPrefixSecurityString: TestPrefixSecurityString,
        val localDate: LocalDate,
        val plainStringPassword: PlainStringPassword,
        val uuid: UUID,
        val zoneId: ZoneId
    )

    @Test
    fun `test serializers`() {
        val randomService = DummyRandomService()
        val s =
            SerializationTest(
                Instant.ofEpochMilli(1631885748409),
                TestSerializeAsString("test"),
                randomService.id(),
                randomService.id(),
                randomService.stringId(TestStringId.length),
                randomService.stringId(TestStringId.length),
                randomService.securityString(TestStringId.length),
                randomService.securityString(TestStringId.length),
                LocalDate.of(2021, 9, 17),
                PlainStringPassword("mon mot de passe secret"),
                OrgarifStringUtils.deserializeUuid("a8f088f151794107a30b1eaaa6519c98"),
                ZoneId.of("Europe/Paris"))
        println(Serializer.serialize(s))
        val expectedJson =
            """
{
  "instant": 1631885748409,
  "testSerializeAsString": "test",
  "testUuidId": "f89ac98cacc54eea98561cc9658a6663",
  "testPrefixUuidId": "test_prefix_bf23ea927f8a4e14a9a11b6604f979eb",
  "testStringId": "03LOeGFj5ZibyaqdISrO",
  "testPrefixStringId": "test_prefix_rSSPouSEbuXmda1rHUFC",
  "testSecurityString": "LcgNlMuaL716RP9OMOeI",
  "testPrefixSecurityString": "test_prefix_PCupnBvafn8QDccenqyT",
  "localDate": "2021-09-17",
  "plainStringPassword": "****** filteredPassword ******",
  "uuid": "a8f088f151794107a30b1eaaa6519c98",
  "zoneId": "Europe/Paris"
}
""".trim()
        val json = Serializer.serialize(s)
        JSONAssert.assertEquals(expectedJson, JSONObject(json).toString(2), true)
        val u = Serializer.deserialize<SerializationTest>(json)
        val expected = s.copy(plainStringPassword = PlainStringPassword(filteredPassword))
        assertEquals(expected, u)
    }
}
