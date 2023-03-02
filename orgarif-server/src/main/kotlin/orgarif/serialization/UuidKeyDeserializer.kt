package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.utils.OrgarifStringUtils

class UuidKeyDeserializer : KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?) =
        OrgarifStringUtils.deserializeUuid(key)
}
