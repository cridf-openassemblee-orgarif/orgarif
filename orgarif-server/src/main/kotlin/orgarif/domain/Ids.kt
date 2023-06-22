package orgarif.domain

import java.util.UUID
import orgarif.utils.stringUuid

interface OrgarifId<T> {
    val rawId: T
}

abstract class OrgarifUuidId : OrgarifId<UUID> {
    final override fun toString() = "${javaClass.simpleName}(${stringUuid()})"

    fun stringUuid() = rawId.stringUuid()
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

// TODO[tmpl][serialization] back as an inline class when Jackson supports it ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class CommandLogId(override val rawId: UUID) : OrgarifUuidId()

// TODO[serialization] back as an inline class when Jackson supports it ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class DeliberationId(override val rawId: UUID) : OrgarifUuidId()

data class DepartementId(override val rawId: UUID) : OrgarifUuidId()

data class DeploymentLogId(override val rawId: UUID) : OrgarifUuidId()

data class DesignationId(override val rawId: UUID) : OrgarifUuidId()

data class EluId(override val rawId: UUID) : OrgarifUuidId()

data class InstanceId(override val rawId: UUID) : OrgarifUuidId()

data class LienDeliberationId(override val rawId: UUID) : OrgarifUuidId()

data class MailLogId(override val rawId: UUID) : OrgarifUuidId()

data class NatureJuridiqueId(override val rawId: UUID) : OrgarifUuidId()

data class OrganismeId(override val rawId: UUID) : OrgarifUuidId()

data class RepresentantId(override val rawId: UUID) : OrgarifUuidId()

data class RequestErrorId(override val rawId: UUID) : OrgarifUuidId()

data class SecteurId(override val rawId: UUID) : OrgarifUuidId()

data class TypeStructureId(override val rawId: UUID) : OrgarifUuidId()

data class UserFileId(override val rawId: UUID) : OrgarifUuidId()

data class UserId(override val rawId: UUID) : OrgarifUuidId()

data class UserMailLogId(override val rawId: UUID) : OrgarifUuidId()

data class UserSessionId(override val rawId: UUID) : OrgarifUuidId()
