package orgarif.service.utils

import java.time.LocalDate
import java.util.concurrent.atomic.AtomicInteger
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import orgarif.domain.DeliberationId
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus.*
import orgarif.domain.OrganismeId
import orgarif.domain.RepresentationId
import orgarif.repository.*
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils.deserializeUuid

@Service
class InitialDataInjector(
    @Value("\${injectFakeData}") val injectFakeData: Boolean,
    val organismeDao: OrganismeDao,
    val secteurDao: SecteurDao,
    val natureJuridiqueDao: NatureJuridiqueDao,
    val typeStructureDao: TypeStructureDao,
    val representationDao: RepresentationDao,
    val representantDao: RepresentantDao,
    val suppleanceDao: SuppleanceDao,
    val instanceDao: InstanceDao,
    val eluDao: EluDao,
    val deliberationDao: DeliberationDao,
    val lienDeliberationDao: LienDeliberationDao,
    val randomService: RandomService,
    val dateService: DateService
) {

    val fakeOrganismeId = OrganismeId(deserializeUuid("ddf9d23e60294a8b823162f014a53968"))
    val fakeOrganismeId2 = OrganismeId(deserializeUuid("ced8c29ba05b4ceca05f5104b9c84e28"))
    val fakeInstanceId1 = InstanceId(deserializeUuid("88a344859a574d789f92462779ca7f8f"))
    val fakeInstanceId2 = InstanceId(deserializeUuid("a68887ef582440bf8a525dbbad22f1f5"))
    val nombreRepresentants = 3
    val deliberationIncrement = AtomicInteger(0)

    init {
        val now = dateService.now()
        // inject secteurs, natureJuridiques & typeStructures for all envs
        val secteurs = fetchOrInjectSecteurs()
        val natureJuridiques = fetchOrInjectNatureJuridiques()
        val typeStructures = fetchOrInjectTypeStructure()
        if (injectFakeData) {
            if (organismeDao.fetchOrNull(fakeOrganismeId) == null) {
                organismeDao.insert(
                    OrganismeDao.Record(
                        id = fakeOrganismeId,
                        nom = "Organisme de test (sans instance)",
                        secteurId = secteurs.first().id,
                        natureJuridiqueId = natureJuridiques.first().id,
                        typeStructureId = typeStructures.first().id,
                        nombreRepresentants = nombreRepresentants,
                        creationDate = now,
                        status = live,
                        lastModificationDate = now))
                (1..2).forEach {
                    deliberation().let { deliberationId ->
                        lienDeliberationDao.insert(
                            LienDeliberationDao.Record(
                                id = randomService.id(),
                                organismeId = fakeOrganismeId,
                                instanceId = null,
                                deliberationId = deliberationId,
                                comment = null,
                                creationDate = now,
                                status = live,
                                lastModificationDate = now))
                    }
                    // pour avoir des delib sans lien
                    deliberation()
                }
            }
            if (organismeDao.fetchOrNull(fakeOrganismeId2) == null) {
                organismeDao.insert(
                    OrganismeDao.Record(
                        id = fakeOrganismeId2,
                        nom = "Organisme de test 2 (avec instances)",
                        secteurId = secteurs.first().id,
                        natureJuridiqueId = natureJuridiques.first().id,
                        typeStructureId = typeStructures.first().id,
                        nombreRepresentants = nombreRepresentants,
                        creationDate = now,
                        status = live,
                        lastModificationDate = now))
                instanceDao.insert(
                    InstanceDao.Record(
                        id = fakeInstanceId1,
                        nom = "instance 1",
                        organismeId = fakeOrganismeId2,
                        nombreRepresentants = nombreRepresentants,
                        creationDate = now,
                        status = live,
                        lastModificationDate = now))
                (1..2).forEach {
                    deliberation().let { deliberationId ->
                        lienDeliberationDao.insert(
                            LienDeliberationDao.Record(
                                id = randomService.id(),
                                organismeId = fakeOrganismeId2,
                                instanceId = fakeInstanceId1,
                                deliberationId = deliberationId,
                                comment = null,
                                creationDate = now,
                                status = live,
                                lastModificationDate = now))
                    }
                }
                instanceDao.insert(
                    InstanceDao.Record(
                        id = fakeInstanceId2,
                        nom = "instance 2",
                        organismeId = fakeOrganismeId2,
                        nombreRepresentants = nombreRepresentants,
                        creationDate = now,
                        status = live,
                        lastModificationDate = now))
                (1..2).forEach {
                    deliberation().let { deliberationId ->
                        lienDeliberationDao.insert(
                            LienDeliberationDao.Record(
                                id = randomService.id(),
                                organismeId = fakeOrganismeId2,
                                instanceId = fakeInstanceId2,
                                deliberationId = deliberationId,
                                comment = null,
                                creationDate = now,
                                status = live,
                                lastModificationDate = now))
                    }
                }
            }
            injectRepresentations()
        }
    }

    fun injectRepresentations() =
        synchronized(this) {
            if (injectFakeData) {
                val elus = eluDao.fetchAll().sortedBy { it.id.rawId.toString() }
                if (elus.isEmpty()) {
                    return
                }
                if (representationDao.fetchAll().isNotEmpty()) {
                    return
                }
                val now = dateService.now()
                val i = AtomicInteger(1)
                val representantByEluId = representantDao.fetchAll().associateBy { it.eluId }
                listOf(
                    fakeOrganismeId to null,
                    fakeOrganismeId2 to fakeInstanceId1,
                    fakeOrganismeId2 to fakeInstanceId2)
                    .forEach { (organismeId, instanceId) ->
                        val reps =
                            (1..nombreRepresentants).map { i.getAndIncrement() }.mapIndexed {
                                index,
                                incr ->
                                val id = randomService.id<RepresentationId>()
                                representationDao.insert(
                                    RepresentationDao.Record(
                                        id = id,
                                        representantId =
                                            representantByEluId.getValue(elus.get(incr).id).id,
                                        organismeId = organismeId,
                                        instanceId = instanceId,
                                        position = index,
                                        startDate = null,
                                        endDate = null,
                                        creationDate = now,
                                        status = live,
                                        lastModificationDate = now))
                                id
                            }
                        (1..nombreRepresentants).map { i.getAndIncrement() }.forEachIndexed {
                            index,
                            incr ->
                            if (incr % 2 == 0) {
                                suppleanceDao.insert(
                                    SuppleanceDao.Record(
                                        id = randomService.id(),
                                        representantId =
                                            representantByEluId.getValue(elus.get(incr).id).id,
                                        representationId = reps.get(index),
                                        organismeId = organismeId,
                                        startDate = null,
                                        endDate = null,
                                        creationDate = now,
                                        status = live,
                                        lastModificationDate = now))
                            }
                        }
                    }
            }
        }

    private fun deliberation(): DeliberationId {
        val id = randomService.id<DeliberationId>()
        val now = dateService.now()
        val date = LocalDate.of(2020, 1, 1).plusDays(deliberationIncrement.getAndIncrement() * 10L)
        deliberationDao.insert(
            DeliberationDao.Record(
                id = id,
                libelle = "Délibération du $date",
                deliberationDate = date,
                creationDate = now,
                lastModificationDate = now))
        return id
    }

    fun fetchOrInjectSecteurs() =
        secteurDao.fetchAll().let {
            if (it.isEmpty()) {
                listOf(
                    "Lycées",
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
                        SecteurDao.Record(randomService.id(), it, live, dateService.now()).apply {
                            secteurDao.insert(this)
                        }
                    }
            } else {
                it
            }
        }

    fun fetchOrInjectNatureJuridiques() =
        natureJuridiqueDao.fetchAll().let {
            if (it.isEmpty()) {
                listOf(
                    "Association",
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
                        NatureJuridiqueDao.Record(randomService.id(), it, live, dateService.now())
                            .apply { natureJuridiqueDao.insert(this) }
                    }
            } else {
                it
            }
        }

    fun fetchOrInjectTypeStructure() =
        typeStructureDao.fetchAll().let {
            if (it.isEmpty()) {
                listOf(
                    "Dispositif régional",
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
                        TypeStructureDao.Record(randomService.id(), it, live, dateService.now())
                            .apply { typeStructureDao.insert(this) }
                    }
            } else {
                it
            }
        }
}
