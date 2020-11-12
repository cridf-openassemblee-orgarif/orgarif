package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.domain.InstanceId
import orgarif.domain.OrganismeDeliberationId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables
import orgarif.jooq.generated.Tables.LIEN_DELIBERATION
import orgarif.jooq.generated.tables.records.LienDeliberationRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.time.ZoneOffset

@Repository
class LienDeliberationDao(val jooq: DSLContext) {

    data class Record(val id: OrganismeDeliberationId,
                      val deliberationId: DeliberationId,
                      val organismeId: OrganismeId,
                      val instanceId: InstanceId?,
                      val creationDate: Instant,
                      val lastModificationDate: Instant)

    fun insert(r: Record) {
        val record = LienDeliberationRecord().apply {
            id = r.id.rawId
            deliberationId = r.deliberationId.rawId
            organismeId = r.organismeId.rawId
            instanceId = r.instanceId?.rawId
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            lastModificationDate = r.lastModificationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        jooq.insertInto(LIEN_DELIBERATION).set(record).execute()
    }

    fun deleteByInstanceId(instanceId: InstanceId) {
        jooq.deleteFrom(LIEN_DELIBERATION)
                .where(LIEN_DELIBERATION.INSTANCE_ID.equal(instanceId.rawId))
                .execute()
    }

    fun map(r: LienDeliberationRecord) = Record(
            r.id.toTypeId(),
            r.deliberationId.toTypeId(),
            r.organismeId.toTypeId(),
            r.instanceId?.toTypeId(),
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.lastModificationDate.toInstant(ZoneOffset.UTC))

}
