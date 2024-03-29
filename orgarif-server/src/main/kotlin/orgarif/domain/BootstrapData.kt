package orgarif.domain

import kt2ts.annotation.GenerateTypescript

data class Departement(
    val id: DepartementId,
    val libelle: String,
    val code: String,
    val status: ItemStatus,
)

data class NatureJuridique(val id: NatureJuridiqueId, val libelle: String, val status: ItemStatus)

data class Secteur(val id: SecteurId, val libelle: String, val status: ItemStatus)

data class TypeStructure(val id: TypeStructureId, val libelle: String, val status: ItemStatus)

data class OrganismeCategories(
    val departements: List<Departement>,
    val natureJuridiques: List<NatureJuridique>,
    val secteurs: List<Secteur>,
    val typeStructures: List<TypeStructure>
)

// TODO[tmpl][user] naming start / initial / boot / launch / base Infos ?
// ConnectedUserInfos (logged is bad wording btw)
@GenerateTypescript
data class ApplicationBootstrapData(
    val env: ApplicationEnvironment,
    val sigerUrl: Uri,
    val userInfos: UserInfos?,
    val categories: OrganismeCategories
)
