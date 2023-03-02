package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifUuidId

class OrgarifUuidIdKeySerializer : StdSerializer<OrgarifUuidId>(OrgarifUuidId::class.java) {

    override fun serialize(value: OrgarifUuidId, gen: JsonGenerator, provider: SerializerProvider) =
        gen.writeFieldName(OrgarifUuidIdSerializer.serialize(value))
}
