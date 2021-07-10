package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import orgarif.domain.OrgarifSecurityId
import kotlin.reflect.KClass

class OrgarifSecurityIdDeserializer<T : OrgarifSecurityId>(val orgarifSecurityIdClass: KClass<T>) :
    StdDeserializer<T>(orgarifSecurityIdClass.java) {

    companion object {
        fun <T : OrgarifSecurityId> deserialize(orgarifSecurityIdClass: KClass<T>, value: String) =
            orgarifSecurityIdClass.constructors.first().call(value)
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
        deserialize(orgarifSecurityIdClass, p.valueAsString)

}