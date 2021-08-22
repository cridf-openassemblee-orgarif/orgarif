package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.ReadableStackTrace

class ReadableStackTraceSerializer : StdSerializer<ReadableStackTrace>(ReadableStackTrace::class.java) {

    override fun serialize(value: ReadableStackTrace, gen: JsonGenerator, provider: SerializerProvider) {
        gen.writeString(value.toReadableString())
    }

}