package orgarif.domain

import java.util.*

interface OrgarifId<T> {
    val rawId: T
}

interface OrgarifSecurityId : OrgarifId<String>

interface OrgarifStringId : OrgarifId<String>

interface OrgarifUuidId : OrgarifId<UUID>

// TODO[serialization] remettre en inline class dès que jouable avec Jackson ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class CommandLogId(override val rawId: UUID) : OrgarifUuidId
data class DeploymentLogId(override val rawId: UUID) : OrgarifUuidId
data class MailLogId(override val rawId: UUID) : OrgarifUuidId
data class RequestErrorId(override val rawId: UUID) : OrgarifUuidId
data class UserFileId(override val rawId: UUID) : OrgarifUuidId
data class UserId(override val rawId: UUID) : OrgarifUuidId
data class UserSessionId(override val rawId: UUID) : OrgarifUuidId
