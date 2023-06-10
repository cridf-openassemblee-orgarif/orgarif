package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import kotlin.reflect.KClass
import orgarif.domain.SerializeAsString

class SerializeAsStringDeserializer<T : SerializeAsString>(
    private val orgarifStringIdClass: KClass<T>
) : StdDeserializer<T>(orgarifStringIdClass.java) {

    companion object {
        fun <T : SerializeAsString> deserialize(orgarifStringIdClass: KClass<T>, value: String) =
            orgarifStringIdClass.constructors.first().call(value)
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
        deserialize(orgarifStringIdClass, p.valueAsString)
}
