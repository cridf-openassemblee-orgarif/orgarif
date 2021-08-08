package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.SecteurId
import orgarif.jooq.generated.Tables
import orgarif.jooq.generated.Tables.SECTEUR
import orgarif.jooq.generated.tables.records.SecteurRecord
import orgarif.utils.toTypeId


@Repository
class SecteurDao(val jooq: DSLContext) {

    data class Record(
        val id: SecteurId,
        val libelle: String
    )

    fun insert(r: Record) {
        val record = SecteurRecord().apply {
            id = r.id.rawId
            libelle = r.libelle
        }
        jooq.insertInto(SECTEUR).set(record).execute()
    }

    fun fetchAll() =
        jooq.selectFrom(SECTEUR)
            .fetch()
            .map(this::map)

    fun updateLibelle(id: SecteurId, libelle: String) {
        jooq.update(SECTEUR)
            .set(SECTEUR.LIBELLE, libelle)
            .where(SECTEUR.ID.equal(id.rawId))
            .execute()
    }

    fun delete(id: SecteurId) {
        jooq.deleteFrom(SECTEUR)
            .where(SECTEUR.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: SecteurRecord) = Record(
        r.id.toTypeId(),
        r.libelle
    )

}
