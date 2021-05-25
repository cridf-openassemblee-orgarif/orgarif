package orgarif.serialization

import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import orgarif.domain.OrgarifUuidId
import java.util.*

class IdSerializerNg  : KSerializer<OrgarifUuidId> {
    override val descriptor = PrimitiveSerialDescriptor("UUID", PrimitiveKind.STRING)

    override fun deserialize(decoder: Decoder): OrgarifUuidId {
      TODO()
    }

    override fun serialize(encoder: Encoder, value: OrgarifUuidId) {
        encoder.encodeString(value.toString())
    }
}