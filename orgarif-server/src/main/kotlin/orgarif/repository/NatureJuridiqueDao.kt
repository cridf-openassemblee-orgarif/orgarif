package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.ItemStatus
import orgarif.domain.NatureJuridiqueId
import orgarif.jooq.generated.Tables.NATURE_JURIDIQUE
import orgarif.jooq.generated.tables.records.NatureJuridiqueRecord
import orgarif.utils.toTypeId

@Repository
class NatureJuridiqueDao(val jooq: DSLContext) {

    data class Record(
        val id: NatureJuridiqueId,
        val libelle: String,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            NatureJuridiqueRecord().apply {
                id = r.id.rawId
                libelle = r.libelle
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(NATURE_JURIDIQUE).set(record).execute()
    }

    fun fetchAll() = jooq.selectFrom(NATURE_JURIDIQUE).fetch().map(this::map)

    fun updateLibelle(id: NatureJuridiqueId, libelle: String, modificationDate: Instant) {
        jooq
            .update(NATURE_JURIDIQUE)
            .set(NATURE_JURIDIQUE.LIBELLE, libelle)
            .set(NATURE_JURIDIQUE.LAST_MODIFICATION_DATE, modificationDate)
            .where(NATURE_JURIDIQUE.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: NatureJuridiqueId, status: ItemStatus, modificationDate: Instant) {
        jooq
            .update(NATURE_JURIDIQUE)
            .set(NATURE_JURIDIQUE.STATUS, status.name)
            .set(NATURE_JURIDIQUE.LAST_MODIFICATION_DATE, modificationDate)
            .where(NATURE_JURIDIQUE.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: NatureJuridiqueRecord) =
        Record(
            r.id.toTypeId(),
            r.libelle,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
