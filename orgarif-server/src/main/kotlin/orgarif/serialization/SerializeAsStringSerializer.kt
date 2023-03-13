package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.SerializeAsString

class SerializeAsStringSerializer :
    StdSerializer<SerializeAsString>(SerializeAsString::class.java) {

    companion object {
        fun serialize(value: SerializeAsString) = value.serialize()
    }

    override fun serialize(
        value: SerializeAsString,
        gen: JsonGenerator,
        provider: SerializerProvider
    ) = gen.writeString(Companion.serialize(value))
}
