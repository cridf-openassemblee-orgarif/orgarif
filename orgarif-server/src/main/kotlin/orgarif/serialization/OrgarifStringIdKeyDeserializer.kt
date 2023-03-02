package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.domain.OrgarifStringId
import kotlin.reflect.KClass

class OrgarifStringIdKeyDeserializer<T : OrgarifStringId>(val orgarifStringId: KClass<T>) :
    KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
        OrgarifStringIdDeserializer.deserialize(orgarifStringId, key)
}
