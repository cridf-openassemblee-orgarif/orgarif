package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.EluId
import orgarif.domain.RepresentantId
import orgarif.jooq.generated.tables.records.RepresentantRecord
import orgarif.jooq.generated.tables.references.REPRESENTANT
import orgarif.utils.OrgarifStringUtils
import orgarif.utils.toTypeId

@Repository
class RepresentantDao(val jooq: DSLContext) {

    data class Record(
        val id: RepresentantId,
        val eluId: EluId? = null,
        val prenom: String,
        val nom: String,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        jooq
            .insertInto(REPRESENTANT)
            .set(
                RepresentantRecord(
                    id = r.id.rawId,
                    eluId = r.eluId?.rawId,
                    prenom = r.prenom,
                    nom = r.nom,
                    searchPrenom = OrgarifStringUtils.cleanForSearch(r.prenom),
                    searchNom = OrgarifStringUtils.cleanForSearch(r.nom),
                    creationDate = r.creationDate,
                    lastModificationDate = r.lastModificationDate))
            .execute()
    }

    fun updateByEluId(eluId: EluId, prenom: String, nom: String, lastModificationDate: Instant) {
        jooq
            .update(REPRESENTANT)
            .set(REPRESENTANT.PRENOM, prenom)
            .set(REPRESENTANT.NOM, nom)
            .set(REPRESENTANT.SEARCH_PRENOM, OrgarifStringUtils.cleanForSearch(prenom))
            .set(REPRESENTANT.SEARCH_NOM, OrgarifStringUtils.cleanForSearch(nom))
            .set(REPRESENTANT.LAST_MODIFICATION_DATE, lastModificationDate)
            .where(REPRESENTANT.ELU_ID.equal(eluId.rawId))
            .execute()
    }

    fun fetch(id: RepresentantId) =
        jooq
            .selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetch(ids: Set<RepresentantId>): List<Record> =
        jooq
            .selectFrom(REPRESENTANT)
            .where(REPRESENTANT.ID.`in`(ids.map { it.rawId }))
            .fetch()
            .map(this::map)

    fun search(searchToken: String): List<Record> =
        jooq
            .selectFrom(REPRESENTANT)
            .where(REPRESENTANT.SEARCH_PRENOM.like("%$searchToken%"))
            .or(REPRESENTANT.SEARCH_NOM.like("%$searchToken%"))
            .fetch()
            .map(this::map)

    fun fetchAll(): List<Record> = jooq.selectFrom(REPRESENTANT).fetch().map(this::map)

    private fun map(r: RepresentantRecord) =
        Record(
            r.id.toTypeId(),
            r.eluId?.toTypeId(),
            r.prenom,
            r.nom,
            r.creationDate,
            r.lastModificationDate)
}
