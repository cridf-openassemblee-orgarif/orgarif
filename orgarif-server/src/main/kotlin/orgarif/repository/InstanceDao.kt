package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.INSTANCE
import orgarif.jooq.generated.tables.records.InstanceRecord
import orgarif.utils.toTypeId

@Repository
class InstanceDao(val jooq: DSLContext) {

    data class Record(
        val id: InstanceId,
        val nom: String,
        val organismeId: OrganismeId,
        val nombreRepresentants: Int,
        val presenceSuppleants: Boolean,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            InstanceRecord().apply {
                id = r.id.rawId
                nom = r.nom
                organismeId = r.organismeId.rawId
                nombreRepresentants = r.nombreRepresentants
                presenceSuppleants = r.presenceSuppleants
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(INSTANCE).set(record).execute()
    }

    fun fetchOrNull(id: InstanceId) =
        jooq.selectFrom(INSTANCE).where(INSTANCE.ID.equal(id.rawId)).fetchOne()?.let(this::map)

    fun fetchByOrganismeId(organismeId: OrganismeId) =
        jooq
            .selectFrom(INSTANCE)
            .where(INSTANCE.ORGANISME_ID.equal(organismeId.rawId))
            .fetch()
            .map(this::map)

    fun updateNom(id: InstanceId, nom: String, modificationDate: Instant) {
        jooq
            .update(INSTANCE)
            .set(INSTANCE.NOM, nom)
            .set(INSTANCE.LAST_MODIFICATION_DATE, modificationDate)
            .where(INSTANCE.ID.equal(id.rawId))
            .execute()
    }

    fun updateNombreRepresentants(id: InstanceId, nombre: Int, modificationDate: Instant) {
        jooq
            .update(INSTANCE)
            .set(INSTANCE.NOMBRE_REPRESENTANTS, nombre)
            .set(INSTANCE.LAST_MODIFICATION_DATE, modificationDate)
            .where(INSTANCE.ID.equal(id.rawId))
            .execute()
    }

    fun updatePresenceSuppleants(
        id: InstanceId,
        presenceSuppleants: Boolean,
        modificationDate: Instant
    ) {
        jooq
            .update(INSTANCE)
            .set(INSTANCE.PRESENCE_SUPPLEANTS, presenceSuppleants)
            .set(INSTANCE.LAST_MODIFICATION_DATE, modificationDate)
            .where(INSTANCE.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: InstanceId, status: ItemStatus, modificationDate: Instant) {
        jooq
            .update(INSTANCE)
            .set(INSTANCE.STATUS, status.name)
            .set(INSTANCE.LAST_MODIFICATION_DATE, modificationDate)
            .where(INSTANCE.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: InstanceRecord) =
        Record(
            r.id.toTypeId(),
            r.nom,
            r.organismeId.toTypeId(),
            r.nombreRepresentants,
            r.presenceSuppleants,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
