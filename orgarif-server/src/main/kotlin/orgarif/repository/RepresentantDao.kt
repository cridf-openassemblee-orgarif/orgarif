package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.EluId
import orgarif.domain.RepresentantId
import orgarif.jooq.generated.Tables.REPRESENTANT
import orgarif.jooq.generated.tables.records.RepresentantRecord
import orgarif.utils.toTypeId

@Repository
class RepresentantDao(val jooq: DSLContext) {

    data class Record(
        val id: RepresentantId,
        val eluId: EluId? = null,
        val prenom: String? = null,
        val nom: String? = null,
        val creationDate: Instant,
        val lastModificationDate: Instant
    ) {
        init {
            // c'est élu OU prénom / nom
            if (eluId != null && (prenom != null || nom != null)) {
                throw IllegalArgumentException("$this")
            }
            if (eluId == null && (prenom == null || nom == null)) {
                throw IllegalArgumentException("$this")
            }
        }
    }

    fun insert(r: Record) {
        val record =
            RepresentantRecord().apply {
                id = r.id.rawId
                eluId = r.eluId?.rawId
                prenom = r.prenom
                nom = r.nom
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(REPRESENTANT).set(record).execute()
    }

    fun fetch(id: RepresentantId) =
        jooq.selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetch(ids: Set<RepresentantId>): List<Record> =
        jooq.selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ID.`in`(ids.map { it.rawId }))
            .fetch()
            .map(this::map)

    fun fetchAll(): List<Record> = jooq.selectFrom(REPRESENTANT).fetch().map(this::map)

    private fun map(r: RepresentantRecord) =
        Record(
            r.id.toTypeId(),
            r.eluId?.toTypeId(),
            r.prenom,
            r.nom,
            r.creationDate,
            r.lastModificationDate)
}
