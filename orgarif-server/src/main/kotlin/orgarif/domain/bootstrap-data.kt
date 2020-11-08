package orgarif.domain

import orgarif.repository.sql.NatureJuridiqueDao
import orgarif.repository.sql.SecteurDao
import orgarif.repository.sql.TypeStructureDao

typealias Secteur = SecteurDao.Record
typealias NatureJuridique = NatureJuridiqueDao.Record
typealias TypeStructure = TypeStructureDao.Record

data class OrganismeCategories(val secteurs: List<Secteur>,
                               val natureJuridiques: List<NatureJuridique>,
                               val typeStructures: List<TypeStructure>)

// TODO[user] start ? boot ? launch ? base Infos ?
// ConnectedUserInfos (logged pue comme wording btw)
// initial
data class ApplicationBootstrapData(val env: ApplicationEnvironment,
                                    val userInfos: UserInfos?,
                                    val categories: OrganismeCategories,
                                    val elus: List<Elu>)
