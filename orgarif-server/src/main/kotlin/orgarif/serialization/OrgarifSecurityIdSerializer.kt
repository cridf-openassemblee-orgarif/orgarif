package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifSecurityId

class OrgarifSecurityIdSerializer : StdSerializer<OrgarifSecurityId>(OrgarifSecurityId::class.java) {

    override fun serialize(value: OrgarifSecurityId, gen: JsonGenerator, provider: SerializerProvider) {
        gen.writeString(value.rawId)
    }

}