package orgarif.repository

import java.time.Instant
import java.time.LocalDate
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeId
import orgarif.domain.RepresentantId
import orgarif.domain.RepresentationId
import orgarif.domain.SuppleanceId
import orgarif.jooq.generated.Tables.SUPPLEANCE
import orgarif.jooq.generated.tables.records.SuppleanceRecord
import orgarif.utils.toTypeId

@Repository
class SuppleanceDao(val jooq: DSLContext) {

    data class Record(
        val id: SuppleanceId,
        val representantId: RepresentantId,
        val representationId: RepresentationId,
        val organismeId: OrganismeId,
        val startDate: LocalDate?,
        val endDate: LocalDate?,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            SuppleanceRecord().apply {
                id = r.id.rawId
                representantId = r.representantId.rawId
                representationId = r.representationId.rawId
                organismeId = r.organismeId.rawId
                startDate = r.startDate
                endDate = r.endDate
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(SUPPLEANCE).set(record).execute()
    }

    fun fetchByOrganismeId(organismeId: OrganismeId) =
        jooq.selectFrom(SUPPLEANCE)
            .where(SUPPLEANCE.ORGANISME_ID.equal(organismeId.rawId))
            .fetch()
            .map(this::map)

    fun updateStartDate(id: SuppleanceId, startDate: LocalDate?, date: Instant) {
        jooq.update(SUPPLEANCE)
            .set(SUPPLEANCE.START_DATE, startDate)
            .set(SUPPLEANCE.LAST_MODIFICATION_DATE, date)
            .where(SUPPLEANCE.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: SuppleanceRecord) =
        Record(
            r.id.toTypeId(),
            r.representantId.toTypeId(),
            r.representationId.toTypeId(),
            r.organismeId.toTypeId(),
            r.startDate,
            r.endDate,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
