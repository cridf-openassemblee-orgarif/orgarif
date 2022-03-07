package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus
import orgarif.domain.LienDeliberationId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.LIEN_DELIBERATION
import orgarif.jooq.generated.tables.records.LienDeliberationRecord
import orgarif.utils.toTypeId

@Repository
class LienDeliberationDao(val jooq: DSLContext) {

    data class Record(
        val id: LienDeliberationId,
        val organismeId: OrganismeId,
        val instanceId: InstanceId?,
        val deliberationId: DeliberationId,
        val comment: String?,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            LienDeliberationRecord().apply {
                id = r.id.rawId
                organismeId = r.organismeId.rawId
                instanceId = r.instanceId?.rawId
                deliberationId = r.deliberationId.rawId
                comment = r.comment
                status = r.status.name
                creationDate = r.creationDate
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

    fun map(r: LienDeliberationRecord) =
        Record(
            r.id.toTypeId(),
            r.organismeId.toTypeId(),
            r.instanceId?.toTypeId(),
            r.deliberationId.toTypeId(),
            r.comment,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
