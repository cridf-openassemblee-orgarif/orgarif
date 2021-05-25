@file:UseSerializers(UUIDSerializerNg::class, IdSerializerNg::class)

package orgarif.domain

import com.fasterxml.jackson.databind.ser.std.UUIDSerializer
import kotlinx.serialization.Contextual
import kotlinx.serialization.Polymorphic
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import orgarif.serialization.IdSerializerNg
import orgarif.serialization.UUIDSerializerNg
import java.util.*


@Polymorphic
interface OrgarifId<T> {
    @Contextual
    val rawId: T
}

@Polymorphic
interface OrgarifStringId : OrgarifId<String>

@Polymorphic
interface OrgarifUuidId : OrgarifId<UUID>

interface OrgarifSecurityId : OrgarifStringId

// TODO[serialization] remettre en inline class dès que jouable avec Jackson ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
@Serializable
inline class CommandLogId(
    @Serializable(with = UUIDSerializerNg::class)
    override val rawId: UUID
) : OrgarifUuidId

@Serializable
inline class DeliberationId(@Contextual override val rawId: UUID) : OrgarifUuidId
inline class DeploymentLogId(override val rawId: UUID) : OrgarifUuidId
inline class EluId(override val rawId: UUID) : OrgarifUuidId
inline class InstanceId(override val rawId: UUID) : OrgarifUuidId
inline class LienDeliberationId(override val rawId: UUID) : OrgarifUuidId
inline class MailLogId(override val rawId: UUID) : OrgarifUuidId
inline class NatureJuridiqueId(override val rawId: UUID) : OrgarifUuidId
inline class OrganismeId(override val rawId: UUID) : OrgarifUuidId
inline class RepresentantId(override val rawId: UUID) : OrgarifUuidId
inline class RequestErrorId(override val rawId: UUID) : OrgarifUuidId
inline class SecteurId(override val rawId: UUID) : OrgarifUuidId
inline class TypeStructureId(override val rawId: UUID) : OrgarifUuidId
inline class UserId(override val rawId: UUID) : OrgarifUuidId
inline class UserSessionId(override val rawId: UUID) : OrgarifUuidId