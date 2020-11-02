package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.EluId
import orgarif.domain.InstanceId
import orgarif.domain.RepresentantId
import orgarif.jooq.generated.Tables.REPRESENTANT_INSTANCE
import orgarif.jooq.generated.tables.records.RepresentantInstanceRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.time.ZoneOffset

@Repository
class RepresentantInstanceDao(val jooq: DSLContext) {

    data class Record(val id: RepresentantId,
                      val eluId: EluId,
                      val instanceId: InstanceId,
                      val position: Int,
                      val isSuppleant: Boolean,
                      val creationDate: Instant,
                      val lastMotificationDate: Instant)

    fun insert(r: Record) {
        val record = RepresentantInstanceRecord().apply {
            id = r.id.rawId
            eluId = r.eluId.rawId
            instanceId = r.instanceId.rawId
            position = r.position
            isSuppleant = r.isSuppleant
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            lastModificationDate = r.lastMotificationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        jooq.insertInto(REPRESENTANT_INSTANCE).set(record).execute()
    }

    fun fetchByInstanceId(instanceId: InstanceId) =
            jooq.selectFrom(REPRESENTANT_INSTANCE)
                    .where(REPRESENTANT_INSTANCE.INSTANCE_ID.equal(instanceId.rawId))
                    .fetch()
                    .map(this::map)

    private fun map(r: RepresentantInstanceRecord) = Record(
            r.id.toTypeId(),
            r.eluId.toTypeId(),
            r.instanceId.toTypeId(),
            r.position,
            r.isSuppleant,
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.lastModificationDate.toInstant(ZoneOffset.UTC))

}
