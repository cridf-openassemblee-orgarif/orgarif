package orgarif.repository

import java.time.Instant
import java.time.LocalDate
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DesignationId
import orgarif.domain.DesignationType
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeId
import orgarif.domain.RepresentantId
import orgarif.jooq.generated.tables.records.DesignationRecord
import orgarif.jooq.generated.tables.references.DESIGNATION
import orgarif.utils.toTypeId

@Repository
class DesignationDao(val jooq: DSLContext) {

    data class Record(
        val id: DesignationId,
        val representantId: RepresentantId,
        val organismeId: OrganismeId,
        val instanceId: InstanceId?,
        val type: DesignationType,
        val position: Int,
        val startDate: LocalDate?,
        val endDate: LocalDate?,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        jooq
            .insertInto(DESIGNATION)
            .set(
                DesignationRecord(
                    id = r.id.rawId,
                    representantId = r.representantId.rawId,
                    organismeId = r.organismeId.rawId,
                    instanceId = r.instanceId?.rawId,
                    type = r.type.name,
                    position = r.position,
                    startDate = r.startDate,
                    endDate = r.endDate,
                    status = r.status.name,
                    creationDate = r.creationDate,
                    lastModificationDate = r.lastModificationDate))
            .execute()
    }

    fun fetch(id: DesignationId) =
        jooq
            .selectFrom(DESIGNATION)
            .where(DESIGNATION.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetchByOrganismeIdEndDateAndStatus(
        organismeId: OrganismeId,
        endDate: LocalDate?,
        status: ItemStatus
    ) =
        jooq
            .selectFrom(DESIGNATION)
            .where(DESIGNATION.ORGANISME_ID.equal(organismeId.rawId))
            .let {
                if (endDate != null) {
                    it.and(DESIGNATION.END_DATE.equal(endDate))
                } else {
                    it.and(DESIGNATION.END_DATE.isNull)
                }
            }
            .and(DESIGNATION.STATUS.equal(status.name))
            .fetch()
            .map(this::map)

    fun fetchAll() = jooq.selectFrom(DESIGNATION).fetch().map(this::map)

    fun updateDates(id: DesignationId, startDate: LocalDate?, endDate: LocalDate?, date: Instant) {
        jooq
            .update(DESIGNATION)
            .set(DESIGNATION.START_DATE, startDate)
            .set(DESIGNATION.END_DATE, endDate)
            .set(DESIGNATION.LAST_MODIFICATION_DATE, date)
            .where(DESIGNATION.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: DesignationId, status: ItemStatus, modificationDate: Instant) {
        jooq
            .update(DESIGNATION)
            .set(DESIGNATION.STATUS, status.name)
            .set(DESIGNATION.LAST_MODIFICATION_DATE, modificationDate)
            .where(DESIGNATION.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: DesignationRecord) =
        Record(
            r.id.toTypeId(),
            r.representantId.toTypeId(),
            r.organismeId.toTypeId(),
            r.instanceId?.toTypeId(),
            DesignationType.valueOf(r.type),
            r.position,
            r.startDate,
            r.endDate,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
