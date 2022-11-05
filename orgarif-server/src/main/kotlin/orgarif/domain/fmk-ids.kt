package orgarif.domain

import java.util.UUID
import orgarif.utils.OrgarifStringUtils

interface OrgarifId<T> {
    val rawId: T
}

abstract class OrgarifUuidId : OrgarifId<UUID> {
    final override fun toString() =
        "${javaClass.simpleName}(${OrgarifStringUtils.serializeUuid(rawId)})"
}

abstract class OrgarifStringId : OrgarifId<String> {
    override val rawId: String

    constructor(rawId: String) {
        this.rawId = rawId
        if (rawId.length != length()) {
            throw IllegalArgumentException("$rawId length must be ${length()}")
        }
    }

    abstract fun length(): Int

    final override fun toString() = "${javaClass.simpleName}($rawId)"
}

// TODO[fmk][serialization] back as an inline class when Jackson supports it ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class CommandLogId(override val rawId: UUID) : OrgarifUuidId()

data class DeploymentLogId(override val rawId: UUID) : OrgarifUuidId()

data class MailLogId(override val rawId: UUID) : OrgarifUuidId()

data class RequestErrorId(override val rawId: UUID) : OrgarifUuidId()

data class UserFileId(override val rawId: UUID) : OrgarifUuidId()

data class UserId(override val rawId: UUID) : OrgarifUuidId()

data class UserMailLogId(override val rawId: UUID) : OrgarifUuidId()

data class UserSessionId(override val rawId: UUID) : OrgarifUuidId()
