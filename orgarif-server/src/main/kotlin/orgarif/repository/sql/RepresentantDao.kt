package orgarif.repository.sql

import RepresentantOrSuppleant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.EluId
import orgarif.domain.InstanceId
import orgarif.domain.OrganismeId
import orgarif.domain.RepresentantId
import orgarif.jooq.generated.Tables.REPRESENTANT
import orgarif.jooq.generated.tables.records.RepresentantRecord
import orgarif.utils.toTypeId
import java.time.Instant


@Repository
class RepresentantDao(val jooq: DSLContext) {

    data class Record(
        val id: RepresentantId,
        val eluId: EluId,
        val organismeId: OrganismeId,
        val instanceId: InstanceId?,
        val position: Int,
        val representantOrSuppleant: RepresentantOrSuppleant,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record = RepresentantRecord().apply {
            id = r.id.rawId
            eluId = r.eluId.rawId
            organismeId = r.organismeId.rawId
            instanceId = r.instanceId?.rawId
            position = r.position
            representantOrSuppleant = r.representantOrSuppleant.name
            creationDate = r.creationDate
            lastModificationDate = r.lastModificationDate
        }
        jooq.insertInto(REPRESENTANT).set(record).execute()
    }

    fun fetchById(id: RepresentantId) =
        jooq.selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetchByOrganismeId(organismeId: OrganismeId) =
        jooq.selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ORGANISME_ID.equal(organismeId.rawId))
            .fetch()
            .map(this::map)

    fun fetchByOrganismeInstanceRepresentantOrSuppleant(
        organismeId: OrganismeId,
        instanceId: InstanceId?,
        representantOrSuppleant: RepresentantOrSuppleant
    ): List<Record> =
        jooq.selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ORGANISME_ID.equal(organismeId.rawId))
            .apply {
                if (instanceId == null) {
                    and(REPRESENTANT.INSTANCE_ID.isNull)
                } else {
                    and(REPRESENTANT.INSTANCE_ID.equal(instanceId.rawId))
                }
            }
            .and(REPRESENTANT.REPRESENTANT_OR_SUPPLEANT.equal(representantOrSuppleant.name))
            .fetch()
            .map(this::map)

    fun fetchCurrentPositionByOrganismeInstanceRepresentantOrSuppleant(
        organismeId: OrganismeId,
        instanceId: InstanceId?,
        representantOrSuppleant: RepresentantOrSuppleant
    ): Int? =
        jooq.select(REPRESENTANT.POSITION)
            .from(REPRESENTANT)
            .where(REPRESENTANT.ORGANISME_ID.equal(organismeId.rawId))
            .apply {
                if (instanceId == null) {
                    and(REPRESENTANT.INSTANCE_ID.isNull)
                } else {
                    and(REPRESENTANT.INSTANCE_ID.equal(instanceId.rawId))
                }
            }
            .and(REPRESENTANT.REPRESENTANT_OR_SUPPLEANT.equal(representantOrSuppleant.name))
            .orderBy(REPRESENTANT.POSITION.desc())
            .limit(1)
            .fetchOne()
            ?.let { it.value1() }

    fun updatePosition(id: RepresentantId, newPosition: Int, date: Instant) {
        jooq.update(REPRESENTANT)
            .set(REPRESENTANT.POSITION, newPosition)
            .set(REPRESENTANT.LAST_MODIFICATION_DATE, date)
            .where(REPRESENTANT.ID.equal(id.rawId))
            .execute()
    }

    fun updateRepresentant(
        id: RepresentantId,
        organismeId: OrganismeId,
        instanceId: InstanceId?,
        position: Int,
        representantOrSuppleant: RepresentantOrSuppleant,
        date: Instant
    ) {
        val r = RepresentantRecord().also {
            it.organismeId = organismeId.rawId
            it.instanceId = instanceId?.rawId
            it.position = position
            it.representantOrSuppleant = representantOrSuppleant.name
            it.lastModificationDate = date
        }
        jooq.update(REPRESENTANT)
            .set(r)
            .where(REPRESENTANT.ID.equal(id.rawId))
            .execute()
    }

    fun delete(id: RepresentantId) {
        jooq.deleteFrom(REPRESENTANT)
            .where(REPRESENTANT.ID.equal(id.rawId))
            .execute()
    }

    fun deleteByInstanceId(instanceId: InstanceId) {
        jooq.deleteFrom(REPRESENTANT)
            .where(REPRESENTANT.INSTANCE_ID.equal(instanceId.rawId))
            .execute()
    }

    private fun map(r: RepresentantRecord) = Record(
        r.id.toTypeId(),
        r.eluId.toTypeId(),
        r.organismeId.toTypeId(),
        r.instanceId?.toTypeId(),
        r.position,
        RepresentantOrSuppleant.valueOf(r.representantOrSuppleant),
        r.creationDate,
        r.lastModificationDate
    )

}
