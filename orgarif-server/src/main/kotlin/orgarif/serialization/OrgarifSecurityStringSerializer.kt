package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifSecurityString

class OrgarifSecurityStringSerializer :
    StdSerializer<OrgarifSecurityString>(OrgarifSecurityString::class.java) {

    companion object {
        fun serialize(value: OrgarifSecurityString) =
            OrgarifSerializationPrefixUtils.prefix(value) + value.rawString
    }

    override fun serialize(
        value: OrgarifSecurityString,
        gen: JsonGenerator,
        provider: SerializerProvider
    ) = gen.writeString(serialize(value))
}
