package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import java.util.UUID
import orgarif.utils.uuid

class UuidDeserializer : StdDeserializer<UUID>(UUID::class.java) {

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext) = p.valueAsString.uuid()
}
