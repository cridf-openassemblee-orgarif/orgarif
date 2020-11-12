package orgarif.repository.sql

import org.jooq.DSLContext
import org.jooq.impl.DSL.lower
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.jooq.generated.Tables.DELIBERATION
import orgarif.jooq.generated.tables.records.DeliberationRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneOffset

@Repository
class DeliberationDao(val jooq: DSLContext) {

    data class Record(val id: DeliberationId,
                      val libelle: String,
                      val deliberationDate: LocalDate,
                      val creationDate: Instant,
                      val lastModificationDate: Instant)

    fun insert(r: Record) {
        val record = DeliberationRecord().apply {
            id = r.id.rawId
            libelle = r.libelle
            deliberationDate = r.deliberationDate
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            lastModificationDate = r.lastModificationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
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
                    .where(lower(DELIBERATION.LIBELLE).like("%${searchToken.toLowerCase()}%"))
                    .fetch()
                    .map(this::map)

    fun map(r: DeliberationRecord) = Record(
            r.id.toTypeId(),
            r.libelle,
            r.deliberationDate,
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.lastModificationDate.toInstant(ZoneOffset.UTC))

}
