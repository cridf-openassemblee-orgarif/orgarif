package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.OrganismeId
import orgarif.domain.SecteurId
import orgarif.domain.TypeStructureId
import orgarif.jooq.generated.Tables
import orgarif.jooq.generated.Tables.ORGANISME
import orgarif.jooq.generated.tables.records.OrganismeRecord
import orgarif.utils.toTypeId

@Repository
class OrganismeDao(val jooq: DSLContext) {

    data class Record(
        val id: OrganismeId,
        val nom: String,
        val secteurId: SecteurId?,
        val natureJuridiqueId: NatureJuridiqueId?,
        val typeStructureId: TypeStructureId?,
        val nombreRepresentants: Int?,
        val presenceSuppleants: Boolean,
        val creationDate: Instant,
        val status: ItemStatus,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            OrganismeRecord().apply {
                id = r.id.rawId
                nom = r.nom
                secteurId = r.secteurId?.rawId
                natureJuridiqueId = r.natureJuridiqueId?.rawId
                typeStructureId = r.typeStructureId?.rawId
                nombreRepresentants = r.nombreRepresentants
                presenceSuppleants = r.presenceSuppleants
                creationDate = r.creationDate
                status = r.status.name
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(ORGANISME).set(record).execute()
    }

    fun fetchOrNull(id: OrganismeId) =
        jooq.selectFrom(ORGANISME).where(ORGANISME.ID.equal(id.rawId)).fetchOne()?.let(this::map)

    fun fetch(id: OrganismeId) = fetchOrNull(id) ?: throw IllegalArgumentException("$id")

    fun updateNatureJuridiqueId(
        id: OrganismeId,
        natureJuridiqueId: NatureJuridiqueId?,
        modificationDate: Instant
    ) {
        jooq.update(ORGANISME)
            .set(ORGANISME.NATURE_JURIDIQUE_ID, natureJuridiqueId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateNom(id: OrganismeId, nom: String, modificationDate: Instant) {
        jooq.update(ORGANISME)
            .set(ORGANISME.NOM, nom)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateNombreRepresentants(id: OrganismeId, nombre: Int?, modificationDate: Instant) {
        jooq.update(ORGANISME)
            .set(ORGANISME.NOMBRE_REPRESENTANTS, nombre)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updatePresenceSuppleants(id: OrganismeId, presenceSuppleants: Boolean, modificationDate: Instant) {
        jooq.update(ORGANISME)
            .set(ORGANISME.PRESENCE_SUPPLEANTS, presenceSuppleants)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateSecteurId(id: OrganismeId, secteurId: SecteurId?, modificationDate: Instant) {
        jooq.update(ORGANISME)
            .set(ORGANISME.SECTEUR_ID, secteurId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: OrganismeId, status: ItemStatus, modificationDate: Instant) {
        jooq.update(ORGANISME)
            .set(ORGANISME.STATUS, status.name)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateTypeStructureId(
        id: OrganismeId,
        typeStructureId: TypeStructureId?,
        modificationDate: Instant
    ) {
        jooq.update(ORGANISME)
            .set(ORGANISME.TYPE_STRUCTURE_ID, typeStructureId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun fetchAll() =
        jooq.selectFrom(ORGANISME).orderBy(ORGANISME.CREATION_DATE.desc()).fetch().map(this::map)

    fun fetchBySecteurId(secteurId: SecteurId) =
        jooq.selectFrom(ORGANISME)
            .where(ORGANISME.SECTEUR_ID.equal(secteurId.rawId))
            .orderBy(ORGANISME.CREATION_DATE.desc())
            .fetch()
            .map(this::map)

    fun countBySecteur(secteurId: SecteurId): Int =
        jooq.selectCount()
            .from(ORGANISME)
            .where(ORGANISME.SECTEUR_ID.equal(secteurId.rawId))
            .fetchSingle()
            .value1()

    fun countByNatureJuridique(natureJuridiqueId: NatureJuridiqueId): Int =
        jooq.selectCount()
            .from(ORGANISME)
            .where(ORGANISME.NATURE_JURIDIQUE_ID.equal(natureJuridiqueId.rawId))
            .fetchSingle()
            .value1()

    fun countByTypeStructure(typeStructureId: TypeStructureId): Int =
        jooq.selectCount()
            .from(ORGANISME)
            .where(ORGANISME.TYPE_STRUCTURE_ID.equal(typeStructureId.rawId))
            .fetchSingle()
            .value1()

    private fun map(r: OrganismeRecord) =
        Record(
            r.id.toTypeId(),
            r.nom,
            r.secteurId?.toTypeId(),
            r.natureJuridiqueId?.toTypeId(),
            r.typeStructureId?.toTypeId(),
            r.nombreRepresentants,
            r.presenceSuppleants,
            r.creationDate,
            ItemStatus.valueOf(r.status),
            r.lastModificationDate)
}
