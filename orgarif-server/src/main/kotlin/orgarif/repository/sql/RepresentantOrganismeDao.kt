package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.EluId
import orgarif.domain.OrganismeId
import orgarif.domain.RepresentantId
import orgarif.jooq.generated.Tables.REPRESENTANT_ORGANISME
import orgarif.jooq.generated.tables.records.RepresentantOrganismeRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.time.ZoneOffset

@Repository
class RepresentantOrganismeDao(val jooq: DSLContext) {

    data class Record(val id: RepresentantId,
                      val eluId: EluId,
                      val organismeId: OrganismeId,
                      val position: Int,
                      val isSuppleant: Boolean,
                      val creationDate: Instant,
                      val lastMotificationDate: Instant)

    fun insert(r: Record) {
        val record = RepresentantOrganismeRecord().apply {
            id = r.id.rawId
            eluId = r.eluId.rawId
            organismeId = r.organismeId.rawId
            position = r.position
            isSuppleant = r.isSuppleant
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            lastModificationDate = r.lastMotificationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        jooq.insertInto(REPRESENTANT_ORGANISME).set(record).execute()
    }

    fun fetchByOrganismeId(organismeId: OrganismeId) =
            jooq.selectFrom(REPRESENTANT_ORGANISME)
                    .where(REPRESENTANT_ORGANISME.ORGANISME_ID.equal(organismeId.rawId))
                    .fetch()
                    .map(this::map)

    private fun map(r: RepresentantOrganismeRecord) = Record(
            r.id.toTypeId(),
            r.eluId.toTypeId(),
            r.organismeId.toTypeId(),
            r.position,
            r.isSuppleant,
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.lastModificationDate.toInstant(ZoneOffset.UTC))

}
