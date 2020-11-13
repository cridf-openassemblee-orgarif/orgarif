package orgarif.domain

import java.util.*

interface OrgarifId<T> {
    val rawId: T
}

interface OrgarifStringId : OrgarifId<String>
interface OrgarifUuidId : OrgarifId<UUID>

interface OrgarifSecurityId : OrgarifStringId

// TODO[serialization] remettre en inline class dès que jouable avec Jackson ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class CommandLogId(override val rawId: UUID) : OrgarifUuidId
data class DeliberationId(override val rawId: UUID) : OrgarifUuidId
data class DeploymentLogId(override val rawId: UUID) : OrgarifUuidId
data class EluId(override val rawId: UUID) : OrgarifUuidId
data class InstanceId(override val rawId: UUID) : OrgarifUuidId
data class LienDeliberationId(override val rawId: UUID) : OrgarifUuidId
data class MailLogId(override val rawId: UUID) : OrgarifUuidId
data class NatureJuridiqueId(override val rawId: UUID) : OrgarifUuidId
data class OrganismeId(override val rawId: UUID) : OrgarifUuidId
data class RepresentantId(override val rawId: UUID) : OrgarifUuidId
data class RequestErrorId(override val rawId: UUID) : OrgarifUuidId
data class SecteurId(override val rawId: UUID) : OrgarifUuidId
data class TypeStructureId(override val rawId: UUID) : OrgarifUuidId
data class UserId(override val rawId: UUID) : OrgarifUuidId
data class UserSessionId(override val rawId: UUID) : OrgarifUuidId
