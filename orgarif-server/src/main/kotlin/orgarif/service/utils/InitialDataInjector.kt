package orgarif.service.utils

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import orgarif.domain.*
import orgarif.repository.sql.*
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import java.time.LocalDate

@Service
class InitialDataInjector(@Value("\${injectFakeData}") val injectFakeData: Boolean,
                          val organismeDao: OrganismeDao,
                          val secteurDao: SecteurDao,
                          val natureJuridiqueDao: NatureJuridiqueDao,
                          val typeStructureDao: TypeStructureDao,
                          val representantOrganismeDao: RepresentantOrganismeDao,
                          val eluDao: EluDao,
                          val deliberationDao: DeliberationDao,
                          val organismeDeliberationDao: OrganismeDeliberationDao,
                          val randomService: RandomService,
                          val dateService: DateService) {

    val fakeOrganismeId = OrganismeId(deserializeUuid("ced8c29ba05b4ceca05f5104b9c84e28"))
    val nombreRepresentants = 3

    init {
        val now = dateService.now()
        // inject secteurs, natureJuridiques & typeStructures for all envs
        val secteurs = fetchOrInjectSecteurs()
        val natureJuridiques = fetchOrInjectNatureJuridiques()
        val typeStructures = fetchOrInjectTypeStructure()
        if (injectFakeData && organismeDao.fetchOrNull(fakeOrganismeId) == null) {
            organismeDao.insert(OrganismeDao.Record(
                    id = fakeOrganismeId,
                    nom = "Organisme de test",
                    secteurId = secteurs.random().id,
                    natureJuridiqueId = natureJuridiques.random().id,
                    typeStructureId = typeStructures.random().id,
                    nombreRepresentants = nombreRepresentants,
                    nombreSuppleants = nombreRepresentants,
                    partageRepresentants = false,
                    creationDate = now,
                    lastModificationDate = now))
            val deliberationId = DeliberationId(randomService.randomUUID())
            deliberationDao.insert(DeliberationDao.Record(
                    id = deliberationId,
                    libelle = "Délibération de test",
                    deliberationDate = LocalDate.of(2020, 6, 18),
                    creationDate = now
            ))
            organismeDeliberationDao.insert(OrganismeDeliberationDao.Record(
                    id = OrganismeDeliberationId(randomService.randomUUID()),
                    organismeId = fakeOrganismeId,
                    deliberationId = deliberationId
            ))
            injectRepresentants()
        }

    }

    @Synchronized
    fun injectRepresentants() {
        if (!injectFakeData) {
            return
        }
        val existingRepresentants = representantOrganismeDao.fetchByOrganismeId(fakeOrganismeId)
        if (existingRepresentants.isEmpty()) {
            val elus = eluDao.fetchAll()
            if (elus.isEmpty()) {
                return
            }
            val now = dateService.now()
            elus.shuffled().subList(0, nombreRepresentants * 2).forEachIndexed { index, e ->
                representantOrganismeDao.insert(RepresentantOrganismeDao.Record(
                        RepresentantId(randomService.randomUUID()),
                        e.id,
                        fakeOrganismeId,
                        if (index < nombreRepresentants) index else index - nombreRepresentants,
                        index >= nombreRepresentants,
                        now,
                        now
                ))
            }
        }
    }

    fun fetchOrInjectSecteurs() = secteurDao.fetchAll().let {
        if (it.isEmpty()) {
            listOf("Lycées",
                    "Culture - Patrimoine - Création",
                    "Enseignement supérieur - Recherche",
                    "Développement économique - Attractivité",
                    "Emploi - Formation professionnelle - Apprentissage",
                    "Écologie - Développement durable - Aménagement",
                    "Agriculture - Ruralité",
                    "Stratégie institutionnelle - Grand Paris",
                    "Transports - Mobilités durables",
                    "Logement - Handicap",
                    "Solidarités - Santé - Famille",
                    "Sports - Loisirs - Jeunesse - Citoyenneté - Vie associative",
                    "Tourisme",
                    "Affaires européennes",
                    "Finances - Évaluation des politiques publiques",
                    "Administration générale")
                    .map {
                        val r = SecteurDao.Record(
                                SecteurId(randomService.randomUUID()),
                                it
                        )
                        secteurDao.insert(r)
                        r
                    }
        } else {
            it
        }
    }

    fun fetchOrInjectNatureJuridiques() = natureJuridiqueDao.fetchAll().let {
        if (it.isEmpty()) {
            listOf("Association",
                    "Fondation reconnue d'utilité publique (FRUP)",
                    "Association reconnue d'utilité publique (ARUP)",
                    "Établissement public industriel et commercial (EPIC)",
                    "Syndicat mixte ",
                    "Groupement d'intérêt public (GIP)",
                    "Société d'économie mixte (SEM)",
                    "Société anonyme (SA)",
                    "Établissement public de coopération culturelle (EPCC)",
                    "Établissement public à caractère scientifique, culturel et professionnel (EPCSCP)",
                    "Établissement public administratif (EPA)",
                    "Établissement public (EP)",
                    "Jury",
                    "Société coopérative d'intérêt collectif (SCIC)",
                    "Établissement public de santé (EPS)",
                    "Commission d'appel d'offres")
                    .map {
                        val r = NatureJuridiqueDao.Record(
                                NatureJuridiqueId(randomService.randomUUID()),
                                it
                        )
                        natureJuridiqueDao.insert(r)
                        r
                    }
        } else {
            it
        }
    }

    fun fetchOrInjectTypeStructure() = typeStructureDao.fetchAll().let {
        if (it.isEmpty()) {
            listOf("Dispositif régional",
                    "Lycée",
                    "Université",
                    "Communauté d'universités et établissements (COMUE)",
                    "Pôle de compétitivité",
                    "Groupement d'établissements (GRETA)",
                    "Mission locale",
                    "Maison de l'emploi",
                    "Établissement public d'aménagement (EPA)",
                    "Commission consultative de l'environnement (CCE) ",
                    "Commission locale de l'eau (CLE)",
                    "Commission de suivi de site (CSS)",
                    "Commission locale d'information (CLI)",
                    "Commission locale d'information et de surveillance (CLIS)",
                    "Parc naturel régional (PNR)",
                    "Centre de formation en travail social (CFTS)",
                    "Commission de coordination des politiques publiques de santé (CCPPS)",
                    "Base de plein air et de loisirs (BPAL)")
                    .map {
                        val r = TypeStructureDao.Record(
                                TypeStructureId(randomService.randomUUID()),
                                it
                        )
                        typeStructureDao.insert(r)
                        r
                    }
        } else {
            it
        }
    }

}