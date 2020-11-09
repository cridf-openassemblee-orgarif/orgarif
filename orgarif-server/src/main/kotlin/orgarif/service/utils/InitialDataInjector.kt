package orgarif.service.utils

import RepresentantOrSuppleant
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import orgarif.domain.*
import orgarif.repository.sql.*
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import java.time.LocalDate
import java.util.*

@Service
class InitialDataInjector(@Value("\${injectFakeData}") val injectFakeData: Boolean,
                          val organismeDao: OrganismeDao,
                          val secteurDao: SecteurDao,
                          val natureJuridiqueDao: NatureJuridiqueDao,
                          val typeStructureDao: TypeStructureDao,
                          val representantDao: RepresentantDao,
                          val instanceDao: InstanceDao,
                          val eluDao: EluDao,
                          val deliberationDao: DeliberationDao,
                          val lienDeliberationDao: LienDeliberationDao,
                          val randomService: RandomService,
                          val dateService: DateService) {

    val fakeOrganismeId1 = OrganismeId(deserializeUuid("ced8c29ba05b4ceca05f5104b9c84e28"))
    val fakeOrganismeId2 = OrganismeId(deserializeUuid("2bb58ac22d384db08d5754439d72e3c9"))
    val fakeOrganisme2InstanceId1 = InstanceId(deserializeUuid("66a3e0470f6349448ea03b4462925e31"))
    val fakeOrganisme2InstanceId2 = InstanceId(deserializeUuid("8dc5215dce384b149bb787851f28048b"))
    val fakeOrganismeId3 = OrganismeId(deserializeUuid("0a9faaec24d548a694fd4e024233615e"))
    val fakeOrganisme3InstanceId1 = InstanceId(deserializeUuid("7744d52c5eb545b8938ef35f70c96805"))
    val fakeOrganisme3InstanceId2 = InstanceId(deserializeUuid("c86c66abd3274ee1808baf3353139a02"))
    val nombreRepresentants = 3
    val random = Random()

    init {
        val now = dateService.now()
        // inject secteurs, natureJuridiques & typeStructures for all envs
        val secteurs = fetchOrInjectSecteurs()
        val natureJuridiques = fetchOrInjectNatureJuridiques()
        val typeStructures = fetchOrInjectTypeStructure()
        if (injectFakeData) {
            if (organismeDao.fetchOrNull(fakeOrganismeId1) == null) {
                organismeDao.insert(OrganismeDao.Record(
                        id = fakeOrganismeId1,
                        nom = "Organisme de test 1",
                        secteurId = secteurs.random().id,
                        natureJuridiqueId = natureJuridiques.random().id,
                        typeStructureId = typeStructures.random().id,
                        nombreRepresentants = nombreRepresentants,
                        nombreSuppleants = nombreRepresentants,
                        partageRepresentants = false,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId = deliberation("Délibération organisme 1")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId,
                        organismeId = fakeOrganismeId1,
                        instanceId = null,
                        creationDate = now,
                        lastModificationDate = now))
            }
            if (organismeDao.fetchOrNull(fakeOrganismeId2) == null) {
                organismeDao.insert(OrganismeDao.Record(
                        id = fakeOrganismeId2,
                        nom = "Organisme de test 2",
                        secteurId = secteurs.random().id,
                        natureJuridiqueId = natureJuridiques.random().id,
                        typeStructureId = typeStructures.random().id,
                        nombreRepresentants = null,
                        nombreSuppleants = null,
                        partageRepresentants = false,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId1 = deliberation("Délibération organisme 2")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId1,
                        organismeId = fakeOrganismeId2,
                        instanceId = null,
                        creationDate = now,
                        lastModificationDate = now))
                instanceDao.insert(InstanceDao.Record(
                        id = fakeOrganisme2InstanceId1,
                        nom = "Instance 1",
                        organismeId = fakeOrganismeId2,
                        nombreRepresentants = nombreRepresentants,
                        nombreSuppleants = nombreRepresentants,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId2 = deliberation("Délibération instance 1 organisme 2")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId2,
                        organismeId = fakeOrganismeId2,
                        instanceId = fakeOrganisme2InstanceId1,
                        creationDate = now,
                        lastModificationDate = now))
                instanceDao.insert(InstanceDao.Record(
                        id = fakeOrganisme2InstanceId2,
                        nom = "Instance 2",
                        organismeId = fakeOrganismeId2,
                        nombreRepresentants = nombreRepresentants,
                        nombreSuppleants = nombreRepresentants,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId3 = deliberation("Délibération instance 2 organisme 2")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId3,
                        organismeId = fakeOrganismeId2,
                        instanceId = fakeOrganisme2InstanceId2,
                        creationDate = now,
                        lastModificationDate = now))
            }
            if (organismeDao.fetchOrNull(fakeOrganismeId3) == null) {
                organismeDao.insert(OrganismeDao.Record(
                        id = fakeOrganismeId3,
                        nom = "Organisme de test 3",
                        secteurId = secteurs.random().id,
                        natureJuridiqueId = natureJuridiques.random().id,
                        typeStructureId = typeStructures.random().id,
                        nombreRepresentants = nombreRepresentants,
                        nombreSuppleants = nombreRepresentants,
                        partageRepresentants = true,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId1 = deliberation("Délibération organisme 3")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId1,
                        organismeId = fakeOrganismeId3,
                        instanceId = null,
                        creationDate = now,
                        lastModificationDate = now))
                instanceDao.insert(InstanceDao.Record(
                        id = fakeOrganisme3InstanceId1,
                        nom = "Instance 1",
                        organismeId = fakeOrganismeId3,
                        nombreRepresentants = null,
                        nombreSuppleants = null,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId2 = deliberation("Délibération instance 1 organisme 3")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId2,
                        organismeId = fakeOrganismeId3,
                        instanceId = fakeOrganisme3InstanceId1,
                        creationDate = now,
                        lastModificationDate = now))
                instanceDao.insert(InstanceDao.Record(
                        id = fakeOrganisme3InstanceId2,
                        nom = "Instance 2",
                        organismeId = fakeOrganismeId3,
                        nombreRepresentants = null,
                        nombreSuppleants = null,
                        creationDate = now,
                        lastModificationDate = now))
                val deliberationId3 = deliberation("Délibération instance 2 organisme 3")
                lienDeliberationDao.insert(LienDeliberationDao.Record(
                        id = OrganismeDeliberationId(randomService.randomUUID()),
                        deliberationId = deliberationId3,
                        organismeId = fakeOrganismeId3,
                        instanceId = fakeOrganisme3InstanceId2,
                        creationDate = now,
                        lastModificationDate = now))
            }
            injectRepresentants()
        }
    }

    private fun deliberation(libelle: String): DeliberationId {
        val id = DeliberationId(randomService.randomUUID())
        val now = dateService.now()
        deliberationDao.insert(DeliberationDao.Record(
                id = id,
                libelle = libelle,
                deliberationDate = LocalDate.of(2020, 1, 1)
                        .plusDays(random.nextInt(100).toLong()),
                creationDate = now,
                lastModificationDate = now))
        return id
    }

    @Synchronized
    fun injectRepresentants() {
        if (!injectFakeData) {
            return
        }
        val existingRepresentants = representantDao.fetchByOrganismeId(fakeOrganismeId1)
        if (existingRepresentants.isEmpty()) {
            val elus = eluDao.fetchAll()
            if (elus.isEmpty()) {
                return
            }
            if (organismeDao.fetchOrNull(fakeOrganismeId1) == null ||
                    instanceDao.fetchOrNull(fakeOrganisme2InstanceId1) == null ||
                    instanceDao.fetchOrNull(fakeOrganisme2InstanceId2) == null ||
                    organismeDao.fetchOrNull(fakeOrganismeId3) == null) {
                return
            }
            val now = dateService.now()
            elus.shuffled().subList(0, nombreRepresentants * 2).forEachIndexed { index, e ->
                representantDao.insert(RepresentantDao.Record(
                        id = RepresentantId(randomService.randomUUID()),
                        eluId = e.id,
                        organismeId = fakeOrganismeId1,
                        instanceId = null,
                        position = if (index < nombreRepresentants) index else index - nombreRepresentants,
                        representantOrSuppleant = if (index < nombreRepresentants) RepresentantOrSuppleant.representant
                        else RepresentantOrSuppleant.suppleant,
                        creationDate = now,
                        lastModificationDate = now
                ))
            }
            elus.shuffled().subList(0, nombreRepresentants * 2).forEachIndexed { index, e ->
                representantDao.insert(RepresentantDao.Record(
                        id = RepresentantId(randomService.randomUUID()),
                        eluId = e.id,
                        organismeId = fakeOrganismeId2,
                        instanceId = fakeOrganisme2InstanceId1,
                        position = if (index < nombreRepresentants) index else index - nombreRepresentants,
                        representantOrSuppleant = if (index < nombreRepresentants) RepresentantOrSuppleant.representant
                        else RepresentantOrSuppleant.suppleant,
                        creationDate = now,
                        lastModificationDate = now
                ))
            }
            elus.shuffled().subList(0, nombreRepresentants * 2).forEachIndexed { index, e ->
                representantDao.insert(RepresentantDao.Record(
                        id = RepresentantId(randomService.randomUUID()),
                        eluId = e.id,
                        organismeId = fakeOrganismeId2,
                        instanceId = fakeOrganisme2InstanceId2,
                        position = if (index < nombreRepresentants) index else index - nombreRepresentants,
                        representantOrSuppleant = if (index < nombreRepresentants) RepresentantOrSuppleant.representant
                        else RepresentantOrSuppleant.suppleant,
                        creationDate = now,
                        lastModificationDate = now
                ))
            }
            elus.shuffled().subList(0, nombreRepresentants * 2).forEachIndexed { index, e ->
                representantDao.insert(RepresentantDao.Record(
                        id = RepresentantId(randomService.randomUUID()),
                        eluId = e.id,
                        organismeId = fakeOrganismeId3,
                        instanceId = null,
                        position = if (index < nombreRepresentants) index else index - nombreRepresentants,
                        representantOrSuppleant = if (index < nombreRepresentants) RepresentantOrSuppleant.representant
                        else RepresentantOrSuppleant.suppleant,
                        creationDate = now,
                        lastModificationDate = now
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