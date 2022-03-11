package orgarif.repository

import java.time.Instant
import java.time.LocalDate
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.*
import orgarif.jooq.generated.Tables.REPRESENTATION
import orgarif.jooq.generated.tables.records.RepresentationRecord
import orgarif.utils.toTypeId

@Repository
class RepresentationDao(val jooq: DSLContext) {

    data class Record(
        val id: RepresentationId,
        val representantId: RepresentantId,
        val organismeId: OrganismeId,
        val instanceId: InstanceId?,
        val position: Int,
        val startDate: LocalDate?,
        val endDate: LocalDate?,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            RepresentationRecord().apply {
                id = r.id.rawId
                representantId = r.representantId?.rawId
                organismeId = r.organismeId.rawId
                instanceId = r.instanceId?.rawId
                position = r.position
                startDate = r.startDate
                endDate = r.endDate
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(REPRESENTATION).set(record).execute()
    }

    fun fetch(id: RepresentationId) =
        jooq.selectFrom(REPRESENTATION)
            .where(REPRESENTATION.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetchByOrganismeIdAndStatus(organismeId: OrganismeId, status: ItemStatus) =
        jooq.selectFrom(REPRESENTATION)
            .where(REPRESENTATION.ORGANISME_ID.equal(organismeId.rawId))
            .and(REPRESENTATION.STATUS.equal(status.name))
            .fetch()
            .map(this::map)

    fun fetchByOrganismeInstance(
        organismeId: OrganismeId,
        instanceId: InstanceId?,
    ): List<Record> =
        jooq.selectFrom(REPRESENTATION)
            .where(REPRESENTATION.ORGANISME_ID.equal(organismeId.rawId))
            .apply {
                if (instanceId == null) {
                    and(REPRESENTATION.INSTANCE_ID.isNull)
                } else {
                    and(REPRESENTATION.INSTANCE_ID.equal(instanceId.rawId))
                }
            }
            .fetch()
            .map(this::map)

    fun fetchAll() = jooq.selectFrom(REPRESENTATION).fetch().map(this::map)

    fun fetchCurrentPositionByOrganismeInstance(
        organismeId: OrganismeId,
        instanceId: InstanceId?
    ): Int? =
        jooq
            .select(REPRESENTATION.POSITION)
            .from(REPRESENTATION)
            .where(REPRESENTATION.ORGANISME_ID.equal(organismeId.rawId))
            .apply {
                if (instanceId == null) {
                    and(REPRESENTATION.INSTANCE_ID.isNull)
                } else {
                    and(REPRESENTATION.INSTANCE_ID.equal(instanceId.rawId))
                }
            }
            .orderBy(REPRESENTATION.POSITION.desc())
            .limit(1)
            .fetchOne()
            ?.let { it.value1() }

    fun updatePosition(id: RepresentationId, newPosition: Int, date: Instant) {
        jooq.update(REPRESENTATION)
            .set(REPRESENTATION.POSITION, newPosition)
            .set(REPRESENTATION.LAST_MODIFICATION_DATE, date)
            .where(REPRESENTATION.ID.equal(id.rawId))
            .execute()
    }

    fun updateStartDate(id: RepresentationId, startDate: LocalDate?, date: Instant) {
        jooq.update(REPRESENTATION)
            .set(REPRESENTATION.START_DATE, startDate)
            .set(REPRESENTATION.LAST_MODIFICATION_DATE, date)
            .where(REPRESENTATION.ID.equal(id.rawId))
            .execute()
    }

    fun updateRepresentation(
        id: RepresentationId,
        organismeId: OrganismeId,
        instanceId: InstanceId?,
        position: Int,
        modificationDate: Instant
    ) {
        val r =
            RepresentationRecord().also {
                it.organismeId = organismeId.rawId
                it.instanceId = instanceId?.rawId
                it.position = position
                it.lastModificationDate = modificationDate
            }
        jooq.update(REPRESENTATION).set(r).where(REPRESENTATION.ID.equal(id.rawId)).execute()
    }

    fun updateStatus(id: RepresentationId, status: ItemStatus, modificationDate: Instant) {
        jooq.update(REPRESENTATION)
            .set(REPRESENTATION.STATUS, status.name)
            .set(REPRESENTATION.LAST_MODIFICATION_DATE, modificationDate)
            .where(REPRESENTATION.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: RepresentationRecord) =
        Record(
            r.id.toTypeId(),
            r.representantId?.toTypeId(),
            r.organismeId.toTypeId(),
            r.instanceId?.toTypeId(),
            r.position,
            r.startDate,
            r.endDate,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
