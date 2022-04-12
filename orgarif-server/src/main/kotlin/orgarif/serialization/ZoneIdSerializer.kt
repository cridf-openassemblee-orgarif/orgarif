package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import java.time.ZoneId

class ZoneIdSerializer : StdSerializer<ZoneId>(ZoneId::class.java) {

    override fun serialize(value: ZoneId, gen: JsonGenerator, provider: SerializerProvider) =
        gen.writeString(value.id)
}
