package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import java.time.Instant

class InstantSerializer : StdSerializer<Instant>(Instant::class.java) {

    override fun serialize(value: Instant, gen: JsonGenerator, provider: SerializerProvider) =
        gen.writeNumber(value.toEpochMilli())
}
