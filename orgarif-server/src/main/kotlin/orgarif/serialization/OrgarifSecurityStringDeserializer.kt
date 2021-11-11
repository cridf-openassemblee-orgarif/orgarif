package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import orgarif.domain.OrgarifSecurityString
import kotlin.reflect.KClass

class OrgarifSecurityStringDeserializer<T : OrgarifSecurityString>(val OrgarifSecurityStringClass: KClass<T>) :
    StdDeserializer<T>(OrgarifSecurityStringClass.java) {

    companion object {
        fun <T : OrgarifSecurityString> deserialize(OrgarifSecurityStringClass: KClass<T>, value: String): T =
            OrgarifSerializationPrefixUtils.removePrefix(OrgarifSecurityStringClass, value)
                .let { OrgarifSecurityStringClass.constructors.first().call(it) }
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
        deserialize(OrgarifSecurityStringClass, p.valueAsString)

}