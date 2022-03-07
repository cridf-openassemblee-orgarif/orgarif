package orgarif.repository

import java.time.Instant
import java.time.LocalDate
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.domain.ItemStatus
import orgarif.jooq.generated.Tables.DELIBERATION
import orgarif.jooq.generated.tables.records.DeliberationRecord
import orgarif.utils.OrgarifStringUtils
import orgarif.utils.toTypeId

@Repository
class DeliberationDao(val jooq: DSLContext) {

    data class Record(
        val id: DeliberationId,
        val libelle: String,
        val deliberationDate: LocalDate,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            DeliberationRecord().apply {
                id = r.id.rawId
                libelle = r.libelle
                searchLibelle = OrgarifStringUtils.cleanForSearch(r.libelle)
                deliberationDate = r.deliberationDate
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(DELIBERATION).set(record).execute()
    }

    fun fetch(id: DeliberationId) =
        jooq.selectFrom(DELIBERATION)
            .where(DELIBERATION.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)
            ?: throw IllegalArgumentException("$id")

    fun search(searchToken: String): List<Record> =
        jooq.selectFrom(DELIBERATION)
            .where(DELIBERATION.SEARCH_LIBELLE.like("%$searchToken%"))
            .fetch()
            .map(this::map)

    fun map(r: DeliberationRecord) =
        Record(
            r.id.toTypeId(),
            r.libelle,
            r.deliberationDate,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
