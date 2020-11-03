package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.InstanceId
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.INSTANCE
import orgarif.jooq.generated.tables.records.InstanceRecord
import orgarif.utils.toTypeId

@Repository
class InstanceDao(val jooq: DSLContext) {

    data class Record(val id: InstanceId,
                      val nom: String,
                      val organismeId: OrganismeId,
                      val nombreRepresentants: Int?,
                      val nombreSuppleants: Int?)

    fun insert(r: Record) {
        val record = InstanceRecord().apply {
            id = r.id.rawId
            nom = r.nom
            organismeId = r.organismeId.rawId
            nombreRepresentants = r.nombreRepresentants
            nombreSuppleants = r.nombreSuppleants
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

    private fun map(r: InstanceRecord) = Record(
            r.id.toTypeId(),
            r.nom,
            r.organismeId.toTypeId(),
            r.nombreRepresentants,
            r.nombreSuppleants)

}
