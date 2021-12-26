package orgarif.domain

import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.SecteurDao
import orgarif.repository.TypeStructureDao

typealias Secteur = SecteurDao.Record

typealias NatureJuridique = NatureJuridiqueDao.Record

typealias TypeStructure = TypeStructureDao.Record

data class OrganismeCategories(
    val secteurs: List<Secteur>,
    val natureJuridiques: List<NatureJuridique>,
    val typeStructures: List<TypeStructure>
)

// TODO[user] naming start / initial / boot / launch / base Infos ?
// ConnectedUserInfos (logged is bad wording btw)
data class ApplicationBootstrapData(
    val env: ApplicationEnvironment,
    val userInfos: UserInfos?,
    val categories: OrganismeCategories
)
