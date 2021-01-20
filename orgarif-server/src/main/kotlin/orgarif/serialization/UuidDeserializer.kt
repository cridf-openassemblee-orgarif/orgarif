package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import java.util.*

class UuidDeserializer : StdDeserializer<UUID>(UUID::class.java) {

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): UUID =
        deserializeUuid(p.valueAsString)

}