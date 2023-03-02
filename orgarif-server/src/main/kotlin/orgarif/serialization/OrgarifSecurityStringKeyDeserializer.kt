package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import kotlin.reflect.KClass
import orgarif.domain.OrgarifSecurityString

class OrgarifSecurityStringKeyDeserializer<T : OrgarifSecurityString>(
    val OrgarifSecurityString: KClass<T>
) : KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
        OrgarifSecurityStringDeserializer.deserialize(OrgarifSecurityString, key)
}
