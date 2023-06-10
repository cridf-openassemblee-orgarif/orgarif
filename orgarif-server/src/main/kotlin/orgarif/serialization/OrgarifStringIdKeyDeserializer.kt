package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import kotlin.reflect.KClass
import orgarif.domain.OrgarifStringId

class OrgarifStringIdKeyDeserializer<T : OrgarifStringId>(private val orgarifStringId: KClass<T>) :
    KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
        OrgarifStringIdDeserializer.deserialize(orgarifStringId, key)
}
