package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.NatureJuridiqueId
import orgarif.jooq.generated.Tables.NATURE_JURIDIQUE
import orgarif.jooq.generated.tables.records.NatureJuridiqueRecord
import orgarif.utils.toTypeId


@Repository
class NatureJuridiqueDao(val jooq: DSLContext) {

    data class Record(
        val id: NatureJuridiqueId,
        val libelle: String
    )

    fun insert(r: Record) {
        val record = NatureJuridiqueRecord().apply {
            id = r.id.rawId
            libelle = r.libelle
        }
        jooq.insertInto(NATURE_JURIDIQUE).set(record).execute()
    }

    fun fetchAll() =
        jooq.selectFrom(NATURE_JURIDIQUE)
            .fetch()
            .map(this::map)

    private fun map(r: NatureJuridiqueRecord) = Record(
        r.id.toTypeId(),
        r.libelle
    )

}
