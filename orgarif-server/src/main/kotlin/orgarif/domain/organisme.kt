package orgarif.domain

import java.time.LocalDate
import orgarif.repository.OrganismeDao

enum class ItemStatus {
    live,
    archive,
    trash
}

data class RepresentationDto(
    val id: RepresentationId,
    val representant: RepresentantDto,
    val startDate: LocalDate?,
    val endDate: LocalDate?,
    val suppleance: SuppleanceDto?
)

data class SuppleanceDto(
    val id: SuppleanceId,
    val representant: RepresentantDto,
    val startDate: LocalDate?,
    val endDate: LocalDate?
)

data class RepresentantDto(
    val id: RepresentantId,
    val isElu: Boolean,
    val civilite: String?,
    val prenom: String,
    val nom: String,
    val groupePolitique: String?,
    val groupePolitiqueCourt: String?,
    val imageUrl: String?,
    val eluActif: Boolean?
)

data class DeliberationDto(
    val id: DeliberationId,
    val libelle: String,
    val deliberationDate: LocalDate
)

data class LienDeliberationDto(
    val id: LienDeliberationId,
    val deliberation: DeliberationDto,
    val comment: String?
)

data class InstanceDto(
    val id: InstanceId,
    val nom: String,
    val nombreRepresentants: Int?,
    val presenceSuppleants: Boolean,
    val lienDeliberations: List<LienDeliberationDto>,
    val representations: List<RepresentationDto>,
    val status: ItemStatus
)

data class OrganismeListDto(
    val id: OrganismeId,
    val nom: String,
    val secteurId: SecteurId?,
    val natureJuridiqueId: NatureJuridiqueId?,
    val typeStructureId: TypeStructureId?
) {
    constructor(
        r: OrganismeDao.Record
    ) : this(r.id, r.nom, r.secteurId, r.natureJuridiqueId, r.typeStructureId)
}

data class OrganismeDto(
    val id: OrganismeId,
    val nom: String,
    val departementId: DepartementId?,
    val natureJuridiqueId: NatureJuridiqueId?,
    val secteurId: SecteurId?,
    val typeStructureId: TypeStructureId?,
    val nombreRepresentants: Int?,
    val presenceSuppleants: Boolean,
    val representations: List<RepresentationDto>,
    val lienDeliberations: List<LienDeliberationDto>,
    val instances: List<InstanceDto>,
    val status: ItemStatus
)
