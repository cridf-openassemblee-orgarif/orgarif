package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.domain.OrgarifSecurityString
import kotlin.reflect.KClass

class OrgarifSecurityStringKeyDeserializer<T : OrgarifSecurityString>(val OrgarifSecurityString: KClass<T>) : KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
        OrgarifSecurityStringDeserializer.deserialize(OrgarifSecurityString, key)

}