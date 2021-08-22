package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.domain.SerializeAsString
import kotlin.reflect.KClass

class SerializeAsStringKeyDeserializer<T : SerializeAsString>(val orgarifStringId: KClass<T>) : KeyDeserializer() {

    override fun deserializeKey(key: String?, ctxt: DeserializationContext?): Any {
        // FIXME check about != null
        return key?.let { SerializeAsStringDeserializer.deserialize(orgarifStringId, it) }
            ?: throw IllegalArgumentException()
    }

}