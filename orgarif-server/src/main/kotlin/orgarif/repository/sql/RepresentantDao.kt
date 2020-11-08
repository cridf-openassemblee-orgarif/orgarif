package orgarif.repository.sql

import RepresentantOrSuppleant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.*
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
