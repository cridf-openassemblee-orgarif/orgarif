package orgarif.serialization

import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.KeyDeserializer
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import java.util.*

class UuidKeyDeserializer : KeyDeserializer() {

    override fun deserializeKey(key: String, ctxt: DeserializationContext?): UUID =
            deserializeUuid(key)

}
