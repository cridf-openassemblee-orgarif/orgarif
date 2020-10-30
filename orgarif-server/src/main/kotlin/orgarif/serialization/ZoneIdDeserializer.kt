package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import java.time.ZoneId

class ZoneIdDeserializer : StdDeserializer<ZoneId>(ZoneId::class.java) {

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): ZoneId {
        return ZoneId.of(p.valueAsString)
    }

}