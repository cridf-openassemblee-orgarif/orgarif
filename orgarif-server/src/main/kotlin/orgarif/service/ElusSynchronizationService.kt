package orgarif.service

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import orgarif.domain.Civilite
import orgarif.repository.EluDao
import orgarif.repository.RepresentantDao
import orgarif.serialization.Serializer
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import orgarif.utils.toTypeId

@Service
class ElusSynchronizationService(
    @Value("\${elusSynchronizationUrl}") val elusSynchronizationUrl: String,
    val eluDao: EluDao,
    val representantDao: RepresentantDao,
    val randomService: RandomService,
    val httpService: HttpService,
    val dateService: DateService
) {

    private val logger = KotlinLogging.logger {}

    enum class OpenassembleeCivilite {
        M,
        MME
    }

    data class OpenassembleeElu(
        val id: String,
        val uid: String,
        val civilite: OpenassembleeCivilite?,
        val nom: String?,
        val prenom: String?,
        val groupePolitique: String?,
        val groupePolitiqueCourt: String?,
        val image: String?,
        val actif: Boolean
    )

    data class Data(val elus: List<OpenassembleeElu>)

    fun synchronize() {
        logger.info { "Synchronize elus avec SIGER" }
        val elusJons =
            try {
                val r = httpService.getString(elusSynchronizationUrl)
                if (r.code == 200) {
                    when (r) {
                        is HttpService.MaybeStringResponse.EmptyResponse ->
                            throw RuntimeException("$r")
                        is HttpService.MaybeStringResponse.StringResponse -> r.body
                    }
                } else {
                    logger.error { "Could not synchronize élus. ${r.code}" }
                    return
                }
            } catch (e: Exception) {
                logger.error { "Could not synchronize élus." }
                return
            }
        handleElusJson(elusJons)
    }

    enum class InsertResult {
        insert,
        update,
        unmodified
    }

    // FIXME transaction
    private fun handleElusJson(elusJons: String) {
        val now = dateService.now()
        val data = Serializer.deserialize<Data>(elusJons)
        val newElus =
            data.elus.map { r ->
                val civilite =
                    when (r.civilite) {
                        OpenassembleeCivilite.M -> Civilite.M
                        OpenassembleeCivilite.MME -> Civilite.Mme
                        null -> Civilite.Mme
                    }
                EluDao.Record(
                    id = deserializeUuid(r.uid).toTypeId(),
                    civilite = civilite,
                    prenom = r.prenom?.trim() ?: "",
                    nom = r.nom?.trim() ?: "",
                    groupePolitique = r.groupePolitique?.trim() ?: "",
                    groupePolitiqueCourt = r.groupePolitiqueCourt?.trim() ?: "",
                    imageUrl = r.image ?: "",
                    actif = r.actif,
                    creationDate = now,
                    lastModificationDate = now)
            }
        val existingElus = eluDao.fetchAll().associateBy { it.id }
        val r =
            newElus
                .map { newElu ->
                    val existing = existingElus[newElu.id]
                    if (existing == null) {
                        eluDao.insert(newElu)
                        representantDao.insert(
                            RepresentantDao.Record(
                                id = randomService.id(),
                                eluId = newElu.id,
                                prenom = newElu.prenom,
                                nom = newElu.nom,
                                creationDate = now,
                                lastModificationDate = now))
                        InsertResult.insert
                    } else if (existing !=
                        newElu.copy(
                            creationDate = existing.creationDate,
                            lastModificationDate = existing.lastModificationDate)) {
                        // FIXME[migration] check behaviour
                        // que creation date est ok aussi
                        eluDao.update(
                            existing.id,
                            newElu.civilite,
                            newElu.prenom,
                            newElu.nom,
                            newElu.groupePolitique,
                            newElu.groupePolitiqueCourt,
                            newElu.imageUrl,
                            newElu.actif,
                            now,
                        )
                        representantDao.updateByEluId(existing.id, newElu.prenom, newElu.nom, now)
                        InsertResult.update
                    } else {
                        InsertResult.unmodified
                    }
                }
                .groupBy { it }
        logger.info {
            "Elus synchronization results : ${r[InsertResult.insert]?.size ?: 0} inserts " +
                "${r[InsertResult.update]?.size ?: 0} updates " +
                "${r[InsertResult.unmodified]?.size ?: 0} unmodified "
        }
    }
}
