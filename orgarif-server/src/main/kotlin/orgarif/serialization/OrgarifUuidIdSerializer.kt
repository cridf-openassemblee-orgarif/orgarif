package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifUuidId
import orgarif.utils.OrgarifStringUtils

class OrgarifUuidIdSerializer : StdSerializer<OrgarifUuidId>(OrgarifUuidId::class.java) {

    override fun serialize(value: OrgarifUuidId, gen: JsonGenerator, provider: SerializerProvider) =
            gen.writeString(OrgarifStringUtils.serializeUuid(value.rawId))

}