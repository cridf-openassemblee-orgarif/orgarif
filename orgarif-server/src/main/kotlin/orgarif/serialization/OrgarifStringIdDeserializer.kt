package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import orgarif.domain.OrgarifStringId
import kotlin.reflect.KClass

class OrgarifStringIdDeserializer<T : OrgarifStringId>(val orgarifStringIdClass: KClass<T>) :
    StdDeserializer<T>(orgarifStringIdClass.java) {

    companion object {
        fun <T : OrgarifStringId> deserialize(orgarifStringIdClass: KClass<T>, value: String) =
            orgarifStringIdClass.constructors.first().call(value)
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
        deserialize(orgarifStringIdClass, p.valueAsString)

}