package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.jooq.generated.Tables.DELIBERATION
import orgarif.jooq.generated.tables.records.DeliberationRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneOffset
import java.util.*

@Repository
class DeliberationDao(val jooq: DSLContext) {

    data class Record(val id: DeliberationId,
                      val libelle: String,
                      val deliberationDate: LocalDate,
                      val creationDate: Instant)

    fun insert(r: Record) {
        val record = DeliberationRecord().apply {
            id = r.id.rawId
            libelle = r.libelle
            deliberationDate = r.deliberationDate
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        jooq.insertInto(DELIBERATION).set(record).execute()
    }

    fun fetch(id: DeliberationId) =
            jooq.selectFrom(DELIBERATION)
                    .where(DELIBERATION.ID.equal(id.rawId))
                    .fetchOne()
                    ?.let(this::map)

    private fun map(r: DeliberationRecord) = Record(
            r.id.toTypeId(),
            r.libelle,
            r.deliberationDate,
            r.creationDate.toInstant(ZoneOffset.UTC))

}
