package orgarif.domain

import java.util.UUID

// TODO[serialization] back as an inline class when Jackson supports it ?
// are data classes instead of inline class because of serialization "bugs" with Jackson
data class DeliberationId(override val rawId: UUID) : OrgarifUuidId()

data class DepartementId(override val rawId: UUID) : OrgarifUuidId()

data class EluId(override val rawId: UUID) : OrgarifUuidId()

data class InstanceId(override val rawId: UUID) : OrgarifUuidId()

data class LienDeliberationId(override val rawId: UUID) : OrgarifUuidId()

data class NatureJuridiqueId(override val rawId: UUID) : OrgarifUuidId()

data class OrganismeId(override val rawId: UUID) : OrgarifUuidId()

data class RepresentantId(override val rawId: UUID) : OrgarifUuidId()

data class RepresentationId(override val rawId: UUID) : OrgarifUuidId()

data class SecteurId(override val rawId: UUID) : OrgarifUuidId()

data class SuppleanceId(override val rawId: UUID) : OrgarifUuidId()

data class TypeStructureId(override val rawId: UUID) : OrgarifUuidId()
