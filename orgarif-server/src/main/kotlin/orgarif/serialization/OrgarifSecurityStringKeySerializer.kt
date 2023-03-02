package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifSecurityString

class OrgarifSecurityStringKeySerializer :
    StdSerializer<OrgarifSecurityString>(OrgarifSecurityString::class.java) {

    override fun serialize(
        value: OrgarifSecurityString,
        gen: JsonGenerator,
        provider: SerializerProvider
    ): Unit = gen.writeFieldName(OrgarifSecurityStringSerializer.serialize(value))
}
