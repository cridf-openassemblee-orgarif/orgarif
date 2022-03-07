package orgarif.domain

import orgarif.repository.DepartementDao
import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.SecteurDao
import orgarif.repository.TypeStructureDao

typealias Departement = DepartementDao.Record

typealias NatureJuridique = NatureJuridiqueDao.Record

typealias Secteur = SecteurDao.Record

typealias TypeStructure = TypeStructureDao.Record

data class OrganismeCategories(
    val departements: List<Departement>,
    val natureJuridiques: List<NatureJuridique>,
    val secteurs: List<Secteur>,
    val typeStructures: List<TypeStructure>
)

// TODO[user] naming start / initial / boot / launch / base Infos ?
// ConnectedUserInfos (logged is bad wording btw)
data class ApplicationBootstrapData(
    val env: ApplicationEnvironment,
    val userInfos: UserInfos?,
    val categories: OrganismeCategories
)
