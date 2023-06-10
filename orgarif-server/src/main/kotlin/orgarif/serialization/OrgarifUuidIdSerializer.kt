package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifUuidId

class OrgarifUuidIdSerializer : StdSerializer<OrgarifUuidId>(OrgarifUuidId::class.java) {

    companion object {
        fun serialize(value: OrgarifUuidId) =
            OrgarifSerializationPrefixUtils.prefix(value) + value.stringUuid()
    }

    override fun serialize(value: OrgarifUuidId, gen: JsonGenerator, provider: SerializerProvider) =
        gen.writeString(serialize(value))
}
