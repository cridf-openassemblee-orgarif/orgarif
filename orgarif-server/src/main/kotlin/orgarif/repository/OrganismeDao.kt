package orgarif.repository


import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.OrganismeId
import orgarif.domain.SecteurId
import orgarif.domain.TypeStructureId
import orgarif.jooq.generated.Tables.ORGANISME
import orgarif.jooq.generated.tables.records.OrganismeRecord
import orgarif.utils.toTypeId
import java.time.Instant

@Repository
class OrganismeDao(val jooq: DSLContext) {

    data class Record(
        val id: OrganismeId,
        val nom: String,
        val secteurId: SecteurId?,
        val natureJuridiqueId: NatureJuridiqueId?,
        val typeStructureId: TypeStructureId?,
        val nombreRepresentants: Int?,
        val nombreSuppleants: Int?,
        val partageRepresentants: Boolean,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record = OrganismeRecord().apply {
            id = r.id.rawId
            nom = r.nom
            secteurId = r.secteurId?.rawId
            natureJuridiqueId = r.natureJuridiqueId?.rawId
            typeStructureId = r.typeStructureId?.rawId
            nombreRepresentants = r.nombreRepresentants
            nombreSuppleants = r.nombreSuppleants
            partageRepresentants = r.partageRepresentants
            creationDate = r.creationDate
            lastModificationDate = r.lastModificationDate
        }
        jooq.insertInto(ORGANISME).set(record).execute()
    }

    fun fetchOrNull(id: OrganismeId) =
        jooq.selectFrom(ORGANISME)
            .where(ORGANISME.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetch(id: OrganismeId) =
        fetchOrNull(id)
            ?: throw IllegalArgumentException("$id")

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

    fun updatePartageRepresentants(
        id: OrganismeId,
        partageRepresentants: Boolean,
        modificationDate: Instant
    ) {
        jooq.update(ORGANISME)
            .set(ORGANISME.PARTAGE_REPRESENTANTS, partageRepresentants)
            .set(ORGANISME.LAST_MODIFICATION_DATE, modificationDate)
            .where(ORGANISME.ID.equal(id.rawId))
            .execute()
    }

    fun updateSecteurId(
        id: OrganismeId,
        secteurId: SecteurId?,
        modificationDate: Instant
    ) {
        jooq.update(ORGANISME)
            .set(ORGANISME.SECTEUR_ID, secteurId?.rawId)
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
        jooq.selectFrom(ORGANISME)
            .orderBy(ORGANISME.CREATION_DATE.desc())
            .fetch()
            .map(this::map)

    fun fetchBySecteurId(secteurId: SecteurId) =
        jooq.selectFrom(ORGANISME)
            .where(ORGANISME.SECTEUR_ID.equal(secteurId.rawId))
            .orderBy(ORGANISME.CREATION_DATE.desc())
            .fetch()
            .map(this::map)

    private fun map(r: OrganismeRecord) = Record(
        r.id.toTypeId(),
        r.nom,
        r.secteurId?.toTypeId(),
        r.natureJuridiqueId?.toTypeId(),
        r.typeStructureId?.toTypeId(),
        r.nombreRepresentants,
        r.nombreSuppleants,
        r.partageRepresentants,
        r.creationDate,
        r.lastModificationDate
    )

}
