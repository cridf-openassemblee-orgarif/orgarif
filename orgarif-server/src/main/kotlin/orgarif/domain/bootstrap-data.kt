package orgarif.domain

data class OrganismeCategories(val secteurs: Map<SecteurId, String>,
                               val natureJuridiques: Map<NatureJuridiqueId, String>,
                               val typeStructures: Map<TypeStructureId, String>)

// TODO[user] start ? boot ? launch ? base Infos ?
// ConnectedUserInfos (logged pue comme wording btw)
// initial
data class ApplicationBootstrapData(val env: ApplicationEnvironment,
                                    val userInfos: UserInfos?,
                                    val categories: OrganismeCategories,
                                    val elus: Map<EluId, Elu>)
