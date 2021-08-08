package orgarif.service

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.task.AsyncTaskExecutor
import org.springframework.stereotype.Service
import orgarif.domain.Civilite
import orgarif.repository.EluDao
import orgarif.service.utils.InitialDataInjector
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import orgarif.utils.Serializer.deserialize
import orgarif.utils.toTypeId

@Service
class ElusSynchronizationService(
    @Value("\${doSynchronizeElus}")
    val doSynchronizeElus: Boolean,
    @Value("\${elusSynchronizationUrl}")
    val elusSynchronizationUrl: String,

    val eluDao: EluDao,

    val taskExecutor: AsyncTaskExecutor,
    val httpService: HttpService,
    val dateService: DateService,
    val initialDataInjector: InitialDataInjector
) {

    private val logger = KotlinLogging.logger {}

    init {
        // TODO pas foufou la stratégie systématique
        if (doSynchronizeElus) {
            taskExecutor.execute {
                sync()
            }
        }
    }

    enum class OpenassembleeCivilite {
        M, MME
    }

    data class OpenassembleeElu(
        val id: String,
        val uid: String,
        val civilite: OpenassembleeCivilite,
        val nom: String,
        val prenom: String,
        val groupePolitique: String,
        val groupePolitiqueCourt: String,
        val image: String,
        val actif: Boolean
    )

    data class Data(val elus: List<OpenassembleeElu>)

    fun sync() {
        logger.info { "Synchronize elus avec SIGER" }
        val elusJons = try {
            httpService
                .getString(elusSynchronizationUrl)
                .body
        } catch (e: Exception) {
            logger.error { "Could not synchronize élus." }
            return
        }
        if (elusJons != null) {
            handleElusJson(elusJons)
        }
    }

    enum class InsertResult {
        insert, update, unmodified
    }

    fun handleElusJson(elusJons: String): Int {
        val now = dateService.now()
        val data = deserialize<Data>(elusJons)
        val newElus = data.elus
            .map { r ->
                val civilite = when (r.civilite) {
                    OpenassembleeCivilite.M -> Civilite.M
                    OpenassembleeCivilite.MME -> Civilite.Mme
                }
                EluDao.Record(
                    id = deserializeUuid(r.uid).toTypeId(),
                    civilite = civilite,
                    prenom = r.prenom.trim(),
                    nom = r.nom.trim(),
                    groupePolitique = r.groupePolitique,
                    groupePolitiqueCourt = r.groupePolitiqueCourt,
                    imageUrl = r.image,
                    actif = r.actif,
                    creationDate = now
                )
            }
        val existingElus = eluDao.fetchAll().associateBy { it.id }
        val r = newElus.map { newElu ->
            val existing = existingElus[newElu.id]
            if (existing == null) {
                eluDao.insert(newElu)
                InsertResult.insert
            } else if (existing.copy(creationDate = now) != newElu) {
                eluDao.delete(existing.id)
                eluDao.insert(newElu)
                InsertResult.update
            } else {
                InsertResult.unmodified
            }
        }.groupBy { it }
        logger.info {
            "Elus synchronization results : ${r[InsertResult.insert]?.size ?: 0} inserts " +
                    "${r[InsertResult.update]?.size ?: 0} updates " +
                    "${r[InsertResult.unmodified]?.size ?: 0} unmodified "
        }
        initialDataInjector.injectRepresentants()
        return newElus.size
    }

}
