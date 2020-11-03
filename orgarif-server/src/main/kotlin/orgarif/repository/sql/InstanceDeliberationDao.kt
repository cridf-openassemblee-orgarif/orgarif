package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.domain.InstanceId
import orgarif.domain.OrganismeDeliberationId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.INSTANCE_DELIBERATION
import orgarif.jooq.generated.Tables.ORGANISME_DELIBERATION
import orgarif.jooq.generated.tables.records.InstanceDeliberationRecord
import orgarif.utils.toTypeId

@Repository
class InstanceDeliberationDao(val jooq: DSLContext) {

    data class Record(val id: OrganismeDeliberationId,
                      val instanceId: InstanceId,
                      val deliberationId: DeliberationId)

    fun insert(r: Record) {
        val record = InstanceDeliberationRecord().apply {
            id = r.id.rawId
            instanceId = r.instanceId.rawId
            deliberationId = r.deliberationId.rawId
        }
        jooq.insertInto(INSTANCE_DELIBERATION).set(record).execute()
    }

    fun fetchByInstanceId(instanceId: InstanceId) =
            jooq.selectFrom(INSTANCE_DELIBERATION)
                    .where(INSTANCE_DELIBERATION.INSTANCE_ID.equal(instanceId.rawId))
                    .fetch()
                    .map(this::map)

    private fun map(r: InstanceDeliberationRecord) = Record(
            r.id.toTypeId(),
            r.instanceId.toTypeId(),
            r.deliberationId.toTypeId())

}
