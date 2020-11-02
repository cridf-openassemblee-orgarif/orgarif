package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.SecteurId
import orgarif.jooq.generated.Tables.SECTEUR
import orgarif.jooq.generated.tables.records.SecteurRecord
import orgarif.utils.toTypeId


@Repository
class SecteurDao(val jooq: DSLContext) {

    data class Record(val id: SecteurId,
                      val libelle: String)

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

    private fun map(r: SecteurRecord) = Record(
            r.id.toTypeId(),
            r.libelle)

}
