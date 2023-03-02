package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import kotlin.reflect.KClass
import orgarif.domain.OrgarifStringId

class OrgarifStringIdDeserializer<T : OrgarifStringId>(val orgarifStringIdClass: KClass<T>) :
    StdDeserializer<T>(orgarifStringIdClass.java) {

    companion object {
        fun <T : OrgarifStringId> deserialize(orgarifStringIdClass: KClass<T>, value: String): T =
            OrgarifSerializationPrefixUtils.removePrefix(orgarifStringIdClass, value).let {
                orgarifStringIdClass.constructors.first().call(it)
            }
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
        deserialize(orgarifStringIdClass, p.valueAsString)
}
