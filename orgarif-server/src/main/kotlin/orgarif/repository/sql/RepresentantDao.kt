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
import java.time.ZoneOffset


@Repository
class RepresentantDao(val jooq: DSLContext) {

    data class Record(val id: RepresentantId,
                      val eluId: EluId,
                      val organismeId: OrganismeId,
                      val instanceId: InstanceId?,
                      val position: Int,
                      val representantOrSuppleant: RepresentantOrSuppleant,
                      val creationDate: Instant,
                      val lastMotificationDate: Instant)

    fun insert(r: Record) {
        val record = RepresentantRecord().apply {
            id = r.id.rawId
            eluId = r.eluId.rawId
            organismeId = r.organismeId.rawId
            instanceId = r.instanceId?.rawId
            position = r.position
            representantOrSuppleant = r.representantOrSuppleant.name
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            lastModificationDate = r.lastMotificationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        jooq.insertInto(REPRESENTANT).set(record).execute()
    }

    fun fetchByOrganismeId(organismeId: OrganismeId) =
            jooq.selectFrom(REPRESENTANT)
                    .where(REPRESENTANT.ORGANISME_ID.equal(organismeId.rawId))
                    .fetch()
                    .map(this::map)

    // fetch tous la listes des represetants à laquelle appartient un representant donné
    fun fetchListById(id: RepresentantId): List<Record> {
        val a = REPRESENTANT.`as`("a")
        val b = REPRESENTANT.`as`("b")
        return jooq.select()
                .from(a)
                .join(b)
                .on(a.ORGANISME_ID.equal(b.ORGANISME_ID))
                .and(a.REPRESENTANT_OR_SUPPLEANT.equal(b.REPRESENTANT_OR_SUPPLEANT))
                .where(b.ID.equal(id.rawId))
                .fetchInto(a)
                .map(this::map)
    }

    fun fetchByOrganismeInstanceRepresentantOrSuppleant(
            organismeId: OrganismeId,
            instanceId: InstanceId?,
            representantOrSuppleant: RepresentantOrSuppleant): List<Record> =
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
            representantOrSuppleant: RepresentantOrSuppleant): Int? =
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
                .set(REPRESENTANT.LAST_MODIFICATION_DATE, date.atOffset(ZoneOffset.UTC).toLocalDateTime())
                .where(REPRESENTANT.ID.equal(id.rawId))
                .execute()
    }

    fun updateRepresentant(id: RepresentantId,
                           organismeId: OrganismeId,
                           instanceId: InstanceId?,
                           position: Int,
                           representantOrSuppleant: RepresentantOrSuppleant,
                           date: Instant) {
        val r = RepresentantRecord()
        r.organismeId = organismeId.rawId
        r.instanceId = instanceId?.rawId
        r.position = position
        r.representantOrSuppleant = representantOrSuppleant.name
        r.lastModificationDate = date.atOffset(ZoneOffset.UTC).toLocalDateTime()
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

    private fun map(r: RepresentantRecord) = Record(
            r.id.toTypeId(),
            r.eluId.toTypeId(),
            r.organismeId.toTypeId(),
            r.instanceId?.toTypeId(),
            r.position,
            RepresentantOrSuppleant.valueOf(r.representantOrSuppleant),
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.lastModificationDate.toInstant(ZoneOffset.UTC))

}
