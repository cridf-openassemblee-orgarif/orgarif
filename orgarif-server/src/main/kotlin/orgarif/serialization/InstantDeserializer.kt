package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import java.time.Instant

class InstantDeserializer : StdDeserializer<Instant>(Instant::class.java) {

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): Instant {
        val node: JsonNode = p.codec.readTree(p)
        return Instant.ofEpochMilli(node.longValue())
    }

}