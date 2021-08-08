package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.TypeStructureId
import orgarif.jooq.generated.Tables
import orgarif.jooq.generated.Tables.TYPE_STRUCTURE
import orgarif.jooq.generated.tables.records.TypeStructureRecord
import orgarif.utils.toTypeId

@Repository
class TypeStructureDao(val jooq: DSLContext) {

    data class Record(
        val id: TypeStructureId,
        val libelle: String
    )

    fun insert(r: Record) {
        val record = TypeStructureRecord().apply {
            id = r.id.rawId
            libelle = r.libelle
        }
        jooq.insertInto(TYPE_STRUCTURE).set(record).execute()
    }

    fun fetchAll() =
        jooq.selectFrom(TYPE_STRUCTURE)
            .fetch()
            .map(this::map)

    fun updateLibelle(id: TypeStructureId, libelle: String) {
        jooq.update(TYPE_STRUCTURE)
            .set(TYPE_STRUCTURE.LIBELLE, libelle)
            .where(TYPE_STRUCTURE.ID.equal(id.rawId))
            .execute()
    }

    fun delete(id: TypeStructureId) {
        jooq.deleteFrom(TYPE_STRUCTURE)
            .where(TYPE_STRUCTURE.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: TypeStructureRecord) = Record(
        r.id.toTypeId(),
        r.libelle
    )

}
