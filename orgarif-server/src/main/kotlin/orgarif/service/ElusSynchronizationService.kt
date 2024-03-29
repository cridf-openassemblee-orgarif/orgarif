package orgarif.service

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import orgarif.domain.Civilite
import orgarif.domain.Uri
import orgarif.repository.EluDao
import orgarif.repository.RepresentantDao
import orgarif.service.utils.DateService
import orgarif.service.utils.HttpService
import orgarif.service.utils.random.RandomService
import orgarif.utils.toTypeId

@Service
class ElusSynchronizationService(
    @Value("\${sigerUrl}") val sigerUrl: Uri,
    val eluDao: EluDao,
    val representantDao: RepresentantDao,
    val randomService: RandomService,
    val httpService: HttpService,
    val dateService: DateService,
) {

    private val logger = KotlinLogging.logger {}

    companion object {
        val apiUrl = "api/publicdata/v2/elus-aggregats"
    }

    val objectMapper: ObjectMapper =
        ObjectMapper().apply {
            registerKotlinModule()
            setSerializationInclusion(JsonInclude.Include.NON_NULL)
            configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        }

    enum class OpenassembleeCivilite {
        M,
        MME
    }

    data class OpenassembleeElu(
        val id: Long,
        val uid: String,
        val civilite: OpenassembleeCivilite?,
        val nom: String?,
        val prenom: String?,
        val appartenancesGroupePolitique: List<ApiAppartenanceGroupePolitique>,
        val image: String?,
        val actif: Boolean,
    ) {

        data class ApiAppartenanceGroupePolitique(
            val nomGroupePolitique: String?,
            val nomCourtGroupePolitique: String?,
            val actif: Boolean,
        )
    }

    data class Data(val elus: List<OpenassembleeElu>)

    fun synchronize() {
        logger.info { "Synchronize elus avec SIGER" }
        val elusJons =
            try {
                val r = httpService.execute(HttpMethod.GET, sigerUrl.resolve(apiUrl))
                if (r.code == HttpStatus.OK) {
                    r.bodyString ?: throw RuntimeException("$r")
                } else {
                    logger.error { "Could not synchronize élus. ${r.code}" }
                    return
                }
            } catch (e: Exception) {
                logger.error(e) { "Could not synchronize élus." }
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
        val data = objectMapper.readValue<Data>(elusJons)
        val openassembleeElus =
            data.elus.map { r ->
                val civilite =
                    when (r.civilite) {
                        OpenassembleeCivilite.M -> Civilite.M
                        OpenassembleeCivilite.MME -> Civilite.Mme
                        null -> Civilite.Mme
                    }
                EluDao.Record(
                    id = r.uid.toTypeId(),
                    civilite = civilite,
                    prenom = r.prenom?.trim() ?: "",
                    nom = r.nom?.trim() ?: "",
                    groupePolitique =
                        r.appartenancesGroupePolitique
                            .filter { it.actif }
                            .lastOrNull()
                            ?.nomGroupePolitique
                            ?.trim()
                            ?: "",
                    groupePolitiqueCourt =
                        r.appartenancesGroupePolitique
                            .filter { it.actif }
                            .lastOrNull()
                            ?.nomCourtGroupePolitique
                            ?.trim()
                            ?: "",
                    imageUrl = r.image,
                    actif = r.actif,
                    creationDate = now,
                    lastModificationDate = now)
            }
        val existingElus = eluDao.fetchAll().associateBy { it.id }
        val r =
            openassembleeElus
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
