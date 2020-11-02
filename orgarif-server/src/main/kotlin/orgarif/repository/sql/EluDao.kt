package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.Civilite
import orgarif.domain.EluId
import orgarif.jooq.generated.Tables.ELU
import orgarif.jooq.generated.tables.records.EluRecord
import orgarif.utils.toTypeId

import java.time.Instant
import java.time.ZoneOffset
import java.util.*

@Repository
class EluDao(val jooq: DSLContext) {

    data class Record(val id: EluId,
                      val civilite: Civilite,
                      val prenom: String,
                      val nom: String,
                      val groupePolitique: String,
                      val groupePolitiqueCourt: String,
                      val imageUrl: String,
                      val actif: Boolean,
                      val date: Instant)

    fun insert(r: Record) {
        val record = EluRecord().apply {
            id = r.id.rawId
            civilite = r.civilite.name
            prenom = r.prenom
            nom = r.nom
            groupePolitique = r.groupePolitique
            groupePolitiqueCourt = r.groupePolitiqueCourt
            imageUrl = r.imageUrl
            actif = r.actif
            date = r.date.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        jooq.insertInto(ELU).set(record).execute()
    }

    fun fetchAll() =
            jooq.selectFrom(ELU)
                    .fetch()
                    .map(this::map)

    private fun map(r: EluRecord) = Record(
            r.id.toTypeId(),
            Civilite.valueOf(r.civilite),
            r.prenom,
            r.nom,
            r.groupePolitique,
            r.groupePolitiqueCourt,
            r.imageUrl,
            r.actif,
            r.date.toInstant(ZoneOffset.UTC))

}
