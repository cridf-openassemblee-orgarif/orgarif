package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import kotlin.reflect.KClass
import orgarif.domain.SerializeAsString

class SerializeAsStringKeyDeserializer<T : SerializeAsString>(val orgarifStringId: KClass<T>) :
    KeyDeserializer() {

    override fun deserializeKey(key: String?, ctxt: DeserializationContext?): Any {
        // FIXME check about != null
        return key?.let { SerializeAsStringDeserializer.deserialize(orgarifStringId, it) }
            ?: throw IllegalArgumentException()
    }
}