package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DepartementId
import orgarif.domain.ItemStatus
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.OrganismeId
import orgarif.domain.SecteurId
import orgarif.domain.TypeStructureId
import orgarif.jooq.generated.Tables.ORGANISME
import orgarif.jooq.generated.tables.records.OrganismeRecord
import orgarif.utils.toTypeId

@Repository
class OrganismeDao(val jooq: DSLContext) {

    data class Record(
        val id: OrganismeId,
        val nom: String,
        val departementId: DepartementId?,
        val natureJuridiqueId: NatureJuridiqueId?,
        val secteurId: SecteurId?,
        val typeStructureId: TypeStructureId?,
        val nombreRepresentants: Int,
        val presenceSuppleants: Boolean,
        val status: ItemStatus,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record =
            OrganismeRecord().apply {
                id = r.id.rawId
                nom = r.nom
                departementId = r.departementId?.rawId
                natureJuridiqueId = r.natureJuridiqueId?.rawId
                secteurId = r.secteurId?.rawId
                typeStructureId = r.typeStructureId?.rawId
                nombreRepresentants = r.nombreRepresentants
                presenceSuppleants = r.presenceSuppleants
                status = r.status.name
                creationDate = r.creationDate
                lastModificationDate = r.lastModificationDate
            }
        jooq.insertInto(ORGANISME).set(record).execute()
    }

    fun fetchOrNull(id: OrganismeId) =
        jooq.selectFrom(ORGANISME).where(ORGANISME.ID.equal(id.rawId)).fetchOne()?.let(this::map)

    fun fetch(id: OrganismeId) = fetchOrNull(id) ?: throw IllegalArgumentException("$id")

    fun fetchByCategories(
        status: ItemStatus,
        departementIds: List<DepartementId>,
        natureJuridiqueIds: List<NatureJuridiqueId>,
        secteurIds: List<SecteurId>,
        typeStructureIds: List<TypeStructureId>,
        limit: Int,
        page: Int,
    ): List<Record> =
        jooq
            .selectFrom(ORGANISME)
            .where(ORGANISME.STATUS.equal(status.name))
            .let {
                if (departementIds.isNotEmpty()) {
                    it.and(ORGANISME.DEPARTEMENT_ID.`in`(departementIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .let {
                if (natureJuridiqueIds.isNotEmpty()) {
                    it.and(ORGANISME.NATURE_JURIDIQUE_ID.`in`(natureJuridiqueIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .let {
                if (secteurIds.isNotEmpty()) {
                    it.and(ORGANISME.SECTEUR_ID.`in`(secteurIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .let {
                if (typeStructureIds.isNotEmpty()) {
                    it.and(ORGANISME.TYPE_STRUCTURE_ID.`in`(typeStructureIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .orderBy(ORGANISME.NOM)
            .limit(limit)
            .offset(page)
            .fetch()
            .map(this::map)

    fun count(
        status: ItemStatus,
        departementIds: List<DepartementId>,
        natureJuridiqueIds: List<NatureJuridiqueId>,
        secteurIds: List<SecteurId>,
        typeStructureIds: List<TypeStructureId>,
    ): Int =
        jooq
            .selectCount()
            .from(ORGANISME)
            .where(ORGANISME.STATUS.equal(status.name))
            .let {
                if (departementIds.isNotEmpty()) {
                    it.and(ORGANISME.DEPARTEMENT_ID.`in`(departementIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .let {
                if (natureJuridiqueIds.isNotEmpty()) {
                    it.and(ORGANISME.NATURE_JURIDIQUE_ID.`in`(natureJuridiqueIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .let {
                if (secteurIds.isNotEmpty()) {
                    it.and(ORGANISME.SECTEUR_ID.`in`(secteurIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .let {
                if (typeStructureIds.isNotEmpty()) {
                    it.and(ORGANISME.TYPE_STRUCTURE_ID.`in`(typeStructureIds.map { it.rawId }))
                } else {
                    it
                }
            }
            .fetchSingle()
            .let { it.value1() }

    fun updateDepartementId(
        id: OrganismeId,
        departementId: DepartementId?,
        modificationDate: Instant
    ) {
        jooq
            .update(ORGANISME)
            .set(ORGANISME.DEPARTEMENT_ID, departementId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateNatureJuridiqueId(
        id: OrganismeId,
        natureJuridiqueId: NatureJuridiqueId?,
        modificationDate: Instant
    ) {
        jooq
            .update(ORGANISME)
            .set(ORGANISME.NATURE_JURIDIQUE_ID, natureJuridiqueId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateNom(id: OrganismeId, nom: String, modificationDate: Instant) {
        jooq
            .update(ORGANISME)
            .set(ORGANISME.NOM, nom)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateNombreRepresentants(id: OrganismeId, nombre: Int, modificationDate: Instant) {
        jooq
            .update(ORGANISME)
            .set(ORGANISME.NOMBRE_REPRESENTANTS, nombre)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updatePresenceSuppleants(
        id: OrganismeId,
        presenceSuppleants: Boolean,
        modificationDate: Instant
    ) {
        jooq
            .update(ORGANISME)
            .set(ORGANISME.PRESENCE_SUPPLEANTS, presenceSuppleants)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateSecteurId(id: OrganismeId, secteurId: SecteurId?, modificationDate: Instant) {
        jooq
            .update(ORGANISME)
            .set(ORGANISME.SECTEUR_ID, secteurId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateStatus(id: OrganismeId, status: ItemStatus, modificationDate: Instant) {
        jooq
            .update(ORGANISME)
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
        jooq
            .update(ORGANISME)
            .set(ORGANISME.TYPE_STRUCTURE_ID, typeStructureId?.rawId)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: OrganismeRecord) =
        Record(
            r.id.toTypeId(),
            r.nom,
            r.departementId?.toTypeId(),
            r.natureJuridiqueId?.toTypeId(),
            r.secteurId?.toTypeId(),
            r.typeStructureId?.toTypeId(),
            r.nombreRepresentants,
            r.presenceSuppleants,
            ItemStatus.valueOf(r.status),
            r.creationDate,
            r.lastModificationDate)
}
