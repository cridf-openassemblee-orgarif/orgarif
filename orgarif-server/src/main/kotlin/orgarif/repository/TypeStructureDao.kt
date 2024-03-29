package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.ItemStatus
import orgarif.domain.TypeStructureId
import orgarif.jooq.generated.tables.records.TypeStructureRecord
import orgarif.jooq.generated.tables.references.TYPE_STRUCTURE
import orgarif.utils.toTypeId

@Repository
class TypeStructureDao(val jooq: DSLContext) {

    data class Record(
        val id: TypeStructureId,
        val libelle: String,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        jooq
            .insertInto(TYPE_STRUCTURE)
            .set(
                TypeStructureRecord(
                    id = r.id.rawId,
                    libelle = r.libelle,
                    status = r.status.name,
                    creationDate = r.creationDate,
                    lastModificationDate = r.lastModificationDate))
            .execute()
    }

    fun fetchAll() = jooq.selectFrom(TYPE_STRUCTURE).fetch().map(this::map)

    fun updateLibelle(id: TypeStructureId, libelle: String, modificationDate: Instant) {
        jooq
            .update(TYPE_STRUCTURE)
            .set(TYPE_STRUCTURE.LIBELLE, libelle)
            .set(TYPE_STRUCTURE.LAST_MODIFICATION_DATE, modificationDate)
            .where(TYPE_STRUCTURE.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: TypeStructureId, status: ItemStatus, modificationDate: Instant) {
        jooq
            .update(TYPE_STRUCTURE)
            .set(TYPE_STRUCTURE.STATUS, status.name)
            .set(TYPE_STRUCTURE.LAST_MODIFICATION_DATE, modificationDate)
            .where(TYPE_STRUCTURE.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: TypeStructureRecord) =
        Record(
            r.id.toTypeId(),
            r.libelle,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
