package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.ItemStatus
import orgarif.domain.SecteurId
import orgarif.jooq.generated.Tables.SECTEUR
import orgarif.jooq.generated.tables.records.SecteurRecord
import orgarif.utils.toTypeId

@Repository
class SecteurDao(val jooq: DSLContext) {

    data class Record(
        val id: SecteurId,
        val libelle: String,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            SecteurRecord().apply {
                id = r.id.rawId
                libelle = r.libelle
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(SECTEUR).set(record).execute()
    }

    fun fetchAll() = jooq.selectFrom(SECTEUR).fetch().map(this::map)

    fun updateLibelle(id: SecteurId, libelle: String, modificationDate: Instant) {
        jooq.update(SECTEUR)
            .set(SECTEUR.LIBELLE, libelle)
            .set(SECTEUR.LAST_MODIFICATION_DATE, modificationDate)
            .where(SECTEUR.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: SecteurId, status: ItemStatus, modificationDate: Instant) {
        jooq.update(SECTEUR)
            .set(SECTEUR.STATUS, status.name)
            .set(SECTEUR.LAST_MODIFICATION_DATE, modificationDate)
            .where(SECTEUR.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: SecteurRecord) =
        Record(
            r.id.toTypeId(),
            r.libelle,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
