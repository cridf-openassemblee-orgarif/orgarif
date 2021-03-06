package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.InstanceId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.INSTANCE
import orgarif.jooq.generated.tables.records.InstanceRecord
import orgarif.utils.toTypeId
import java.time.Instant

@Repository
class InstanceDao(val jooq: DSLContext) {

    data class Record(
        val id: InstanceId,
        val nom: String,
        val organismeId: OrganismeId,
        val nombreRepresentants: Int?,
        val nombreSuppleants: Int?,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record = InstanceRecord().apply {
            id = r.id.rawId
            nom = r.nom
            organismeId = r.organismeId.rawId
            nombreRepresentants = r.nombreRepresentants
            nombreSuppleants = r.nombreSuppleants
            creationDate = r.creationDate
            lastModificationDate = r.lastModificationDate
        }
        jooq.insertInto(INSTANCE).set(record).execute()
    }

    fun fetchOrNull(id: InstanceId) =
        jooq.selectFrom(INSTANCE)
            .where(INSTANCE.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetchByOrganismeId(organismeId: OrganismeId) =
        jooq.selectFrom(INSTANCE)
            .where(INSTANCE.ORGANISME_ID.equal(organismeId.rawId))
            .fetch()
            .map(this::map)

    fun delete(id: InstanceId) {
        jooq.deleteFrom(INSTANCE)
            .where(INSTANCE.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: InstanceRecord) = Record(
        r.id.toTypeId(),
        r.nom,
        r.organismeId.toTypeId(),
        r.nombreRepresentants,
        r.nombreSuppleants,
        r.creationDate,
        r.lastModificationDate
    )

}
