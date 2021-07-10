package orgarif.domain

import java.util.*

interface OrgarifId<T> {
    val rawId: T
}

interface OrgarifStringId : OrgarifId<String>
interface OrgarifUuidId : OrgarifId<UUID>

interface OrgarifSecurityId : OrgarifStringId

// TODO[serialization] back as an inline class when Jackson supports it ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class CommandLogId(override val rawId: UUID) : OrgarifUuidId
data class DeploymentLogId(override val rawId: UUID) : OrgarifUuidId
data class MailLogId(override val rawId: UUID) : OrgarifUuidId
data class RequestErrorId(override val rawId: UUID) : OrgarifUuidId
data class UserFileId(override val rawId: UUID) : OrgarifUuidId
data class UserId(override val rawId: UUID) : OrgarifUuidId
data class UserSessionId(override val rawId: UUID) : OrgarifUuidId
