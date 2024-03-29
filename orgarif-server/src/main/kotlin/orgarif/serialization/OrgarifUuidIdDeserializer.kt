package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import kotlin.reflect.KClass
import orgarif.domain.OrgarifUuidId
import orgarif.utils.uuid

class OrgarifUuidIdDeserializer<T : OrgarifUuidId>(val orgarifUuidIdClass: KClass<T>) :
    StdDeserializer<T>(orgarifUuidIdClass.java) {

    companion object {
        fun <T : OrgarifUuidId> deserialize(orgarifUuidIdClass: KClass<T>, value: String): T =
            OrgarifSerializationPrefixUtils.removePrefix(orgarifUuidIdClass, value).let {
                orgarifUuidIdClass.constructors.first().call(it.uuid())
            }
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
        deserialize(orgarifUuidIdClass, p.valueAsString)
}
