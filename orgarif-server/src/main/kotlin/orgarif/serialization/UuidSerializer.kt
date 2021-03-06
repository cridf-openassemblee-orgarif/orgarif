package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import orgarif.utils.OrgarifStringUtils
import java.util.*

class UuidSerializer : StdSerializer<UUID>(UUID::class.java) {

    // TODO[serialization] handle all the null cases ?
    override fun serialize(value: UUID?, gen: JsonGenerator, provider: SerializerProvider) =
        gen.writeString(value?.let { OrgarifStringUtils.serializeUuid(it) } ?: "null")

}