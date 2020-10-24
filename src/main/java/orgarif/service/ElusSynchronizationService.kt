package orgarif.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.task.AsyncTaskExecutor
import org.springframework.stereotype.Service
import orgarif.domain.Elu
import orgarif.domain.enumeration.Civilite
import orgarif.repository.EluRepository

@Service
open class ElusSynchronizationService(@Value("\${orgarif.doSynchronizeElus}")
                                      val doSynchronizeElus: Boolean,
                                      @Value("\${orgarif.elusSynchronizationUrl}")
                                      val elusSynchronizationUrl: String,
                                      val taskExecutor: AsyncTaskExecutor,
                                      val httpService: HttpService,
                                      val objectMapper: ObjectMapper,
                                      val eluRepository: EluRepository) {

    init {
        if (doSynchronizeElus) {
            taskExecutor.execute {
                sync()
            }
        }
    }

    enum class PublicCivilite {
        M, MME
    }

    data class PublicElu(val id: String,
                         val uid: String,
                         val civilite: PublicCivilite,
                         val nom: String,
                         val prenom: String,
                         val groupePolitique: String,
                         val groupePolitiqueCourt: String,
                         val image: String,
                         val actif: Boolean?)

    private val logger = LoggerFactory.getLogger(ElusSynchronizationService::class.java)

    data class Data(val elus: List<PublicElu>)

    open fun sync() {
        val elusJons = try {
            httpService
                .getString(elusSynchronizationUrl)
                .body
        } catch (e: Exception) {
            logger.error("Could not synchronize élus.")
            return
        }
        if (elusJons != null) {
            handleElusJson(elusJons)
        }
    }

    open fun handleElusJson(elusJons: String): Int {
        val data = objectMapper.readValue<Data>(elusJons)
        val newElus = data.elus.map {
            val civilite = when (it.civilite) {
                PublicCivilite.M -> Civilite.M
                PublicCivilite.MME -> Civilite.MME
            }
            Elu()
                .sourceId(it.id)
                .sourceUid(it.uid)
                .civilite(civilite)
                .nom(it.nom)
                .prenom(it.prenom)
                .groupePolitique(it.groupePolitique)
                .groupePolitiqueCourt(it.groupePolitiqueCourt)
                .image(it.image)
                .actif(it.actif)
        }
        val elus = eluRepository.findAll().associateBy { it.sourceId }
        newElus.forEach {
            val existingElu = elus[it.sourceId]
            if (existingElu != null) {
                it.id = existingElu.id
            }
        }
        // FIXME en réalité il faut virer les anciens
        eluRepository.saveAll(newElus)
        return newElus.size
    }

}
