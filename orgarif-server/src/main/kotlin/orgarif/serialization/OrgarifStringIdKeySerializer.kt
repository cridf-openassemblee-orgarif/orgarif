package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.domain.OrgarifStringId

class OrgarifStringIdKeySerializer : StdSerializer<OrgarifStringId>(OrgarifStringId::class.java) {

    override fun serialize(value: OrgarifStringId, gen: JsonGenerator, provider: SerializerProvider) =
        gen.writeFieldName(value.rawId)

}