package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import orgarif.domain.OrgarifUuidId
import orgarif.utils.OrgarifStringUtils
import kotlin.reflect.KClass

class OrgarifUuidIdDeserializer<T : OrgarifUuidId>(val orgarifUuidIdClass: KClass<T>) :
        StdDeserializer<T>(orgarifUuidIdClass.java) {

    companion object {
        fun <T : OrgarifUuidId> deserialize(orgarifUuidIdClass: KClass<T>, value: String) =
                orgarifUuidIdClass.constructors.first().call(OrgarifStringUtils.deserializeUuid(value))
    }

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): T =
            deserialize(orgarifUuidIdClass, p.valueAsString)

}