package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus
import orgarif.domain.LienDeliberationId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables
import orgarif.jooq.generated.Tables.LIEN_DELIBERATION
import orgarif.jooq.generated.tables.records.LienDeliberationRecord
import orgarif.utils.toTypeId
import java.time.Instant

@Repository
class LienDeliberationDao(val jooq: DSLContext) {

    data class Record(
        val id: LienDeliberationId,
        val deliberationId: DeliberationId,
        val organismeId: OrganismeId,
        val instanceId: InstanceId?,
        val creationDate: Instant,
        val status: ItemStatus,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record = LienDeliberationRecord().apply {
            id = r.id.rawId
            deliberationId = r.deliberationId.rawId
            organismeId = r.organismeId.rawId
            instanceId = r.instanceId?.rawId
            creationDate = r.creationDate
            status = r.status.name
            lastModificationDate = r.lastModificationDate
        }
        jooq.insertInto(LIEN_DELIBERATION).set(record).execute()
    }

    fun updateStatus(id: LienDeliberationId, status: ItemStatus, modificationDate: Instant) {
        jooq.update(LIEN_DELIBERATION)
            .set(LIEN_DELIBERATION.STATUS, status.name)
            .set(LIEN_DELIBERATION.LAST_MODIFICATION_DATE, modificationDate)
            .where(LIEN_DELIBERATION.ID.equal(id.rawId))
            .execute()
    }

    fun map(r: LienDeliberationRecord) = Record(
        r.id.toTypeId(),
        r.deliberationId.toTypeId(),
        r.organismeId.toTypeId(),
        r.instanceId?.toTypeId(),
        r.creationDate,
        ItemStatus.valueOf(r.status),
        r.lastModificationDate
    )

}
