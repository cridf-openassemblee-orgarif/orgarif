package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.domain.OrgarifUuidId
import kotlin.reflect.KClass

class OrgarifUuidIdKeyDeserializer<T : OrgarifUuidId>(
    val orgarifUuidIdClass: KClass<T>
) : KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
        OrgarifUuidIdDeserializer.deserialize(orgarifUuidIdClass, key)
}
