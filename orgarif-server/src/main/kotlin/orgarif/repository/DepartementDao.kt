package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DepartementId
import orgarif.domain.ItemStatus
import orgarif.jooq.generated.Tables.DEPARTEMENT
import orgarif.jooq.generated.tables.records.DepartementRecord
import orgarif.utils.toTypeId

@Repository
class DepartementDao(val jooq: DSLContext) {

    data class Record(
        val id: DepartementId,
        val libelle: String,
        val code: String,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            DepartementRecord().apply {
                id = r.id.rawId
                libelle = r.libelle
                code = r.code
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(DEPARTEMENT).set(record).execute()
    }

    fun fetchAll() = jooq.selectFrom(DEPARTEMENT).fetch().map(this::map)

    fun update(id: DepartementId, libelle: String, code: String, modificationDate: Instant) {
        jooq.update(DEPARTEMENT)
            .set(DEPARTEMENT.LIBELLE, libelle)
            .set(DEPARTEMENT.CODE, code)
            .set(DEPARTEMENT.LAST_MODIFICATION_DATE, modificationDate)
            .where(DEPARTEMENT.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: DepartementId, status: ItemStatus, modificationDate: Instant) {
        jooq.update(DEPARTEMENT)
            .set(DEPARTEMENT.STATUS, status.name)
            .set(DEPARTEMENT.LAST_MODIFICATION_DATE, modificationDate)
            .where(DEPARTEMENT.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: DepartementRecord) =
        Record(
            r.id.toTypeId(),
            r.libelle,
            r.code,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
