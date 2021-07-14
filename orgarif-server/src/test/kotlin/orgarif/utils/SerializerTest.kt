package orgarif.utils

import orgarif.utils.Serializer.serialize
import org.junit.Assert.assertEquals
import org.junit.Test

internal class SerializerTest {

    @Test
    fun `test null field is not present in json`() {
        data class Test(val first: String, val second: String?)
        assertEquals("{\"first\":\"bonjour\"}", serialize(Test("bonjour", null)))
    }

//    @Test
//    fun `test null UUID`() {
//        data class Test(val first: String, val uuid: UUID?)
//        assertEquals("{\"first\":\"bonjour\"}", serialize(Test("bonjour", null)))
//    }

}