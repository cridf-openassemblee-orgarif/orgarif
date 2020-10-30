package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.domain.OrgarifSecurityId
import kotlin.reflect.KClass

class OrgarifSecurityIdKeyDeserializer<T : OrgarifSecurityId>(val orgarifSecurityId: KClass<T>) : KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
            OrgarifSecurityIdDeserializer.deserialize(orgarifSecurityId, key)

}