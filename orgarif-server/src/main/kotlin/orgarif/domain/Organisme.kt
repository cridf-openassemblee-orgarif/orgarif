package orgarif.domain

import java.time.LocalDate
import orgarif.repository.EluDao
import orgarif.repository.OrganismeDao
import orgarif.repository.RepresentantDao

enum class ItemStatus {
    live,
    archive,
    trash
}

enum class DesignationType {
    representant,
    suppleant
}

data class DesignationDto(
    val id: DesignationId,
    val representant: RepresentantDto,
    val startDate: LocalDate?,
    val endDate: LocalDate?,
)

data class RepresentantDto(
    val id: RepresentantId,
    val eluId: EluId?,
    val civilite: String?,
    val prenom: String,
    val nom: String,
    val groupePolitique: String?,
    val groupePolitiqueCourt: String?,
    val imageUrl: String?,
    val eluActif: Boolean?
) {
    companion object {
        fun from(r: RepresentantDao.Record, elu: EluDao.Record?) =
            RepresentantDto(
                r.id,
                elu?.id,
                elu?.civilite?.name,
                r.prenom,
                r.nom,
                elu?.groupePolitique,
                elu?.groupePolitiqueCourt,
                elu?.imageUrl,
                elu?.actif)
    }
}

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
    val nombreRepresentants: Int,
    val presenceSuppleants: Boolean,
    val designationRepresentants: List<DesignationDto?>,
    val designationSuppleants: List<DesignationDto?>,
    val lienDeliberations: List<LienDeliberationDto>,
    val status: ItemStatus
)

data class OrganismeListDto(
    val id: OrganismeId,
    val nom: String,
    val departementId: DepartementId?,
    val natureJuridiqueId: NatureJuridiqueId?,
    val secteurId: SecteurId?,
    val typeStructureId: TypeStructureId?
) {
    companion object {
        fun from(r: OrganismeDao.Record) =
            OrganismeListDto(
                r.id, r.nom, r.departementId, r.natureJuridiqueId, r.secteurId, r.typeStructureId)
    }
}

data class OrganismeDto(
    val id: OrganismeId,
    val nom: String,
    val departementId: DepartementId?,
    val natureJuridiqueId: NatureJuridiqueId?,
    val secteurId: SecteurId?,
    val typeStructureId: TypeStructureId?,
    val nombreRepresentants: Int,
    val presenceSuppleants: Boolean,
    val designationRepresentants: List<DesignationDto?>,
    val designationSuppleants: List<DesignationDto?>,
    val lienDeliberations: List<LienDeliberationDto>,
    val instances: List<InstanceDto>,
    val status: ItemStatus
)
