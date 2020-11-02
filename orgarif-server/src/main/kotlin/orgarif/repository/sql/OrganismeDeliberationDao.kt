package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeliberationId
import orgarif.domain.InstanceId
import orgarif.domain.OrganismeDeliberationId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.INSTANCE
import orgarif.jooq.generated.Tables.ORGANISME_DELIBERATION
import orgarif.jooq.generated.tables.records.InstanceRecord
import orgarif.jooq.generated.tables.records.OrganismeDeliberationRecord
import orgarif.utils.toTypeId

import java.util.*

@Repository
class OrganismeDeliberationDao(val jooq: DSLContext) {

    data class Record(val id: OrganismeDeliberationId,
                      val organismeId: OrganismeId,
                      val deliberationId: DeliberationId)

    fun insert(r: Record) {
        val record = OrganismeDeliberationRecord().apply {
            id = r.id.rawId
            organismeId = r.organismeId.rawId
            deliberationId = r.deliberationId.rawId
        }
        jooq.insertInto(ORGANISME_DELIBERATION).set(record).execute()
    }

    private fun map(r: OrganismeDeliberationRecord) = Record(
            r.id.toTypeId(),
            r.organismeId.toTypeId(),
            r.deliberationId.toTypeId())

}
