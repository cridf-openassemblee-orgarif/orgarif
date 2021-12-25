package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.Civilite
import orgarif.domain.EluId
import orgarif.jooq.generated.Tables
import orgarif.jooq.generated.Tables.ELU
import orgarif.jooq.generated.tables.records.EluRecord
import orgarif.utils.toTypeId
import java.time.Instant

@Repository
class EluDao(val jooq: DSLContext) {

    data class Record(
        val id: EluId,
        val civilite: Civilite,
        val prenom: String,
        val nom: String,
        val groupePolitique: String,
        val groupePolitiqueCourt: String,
        val imageUrl: String,
        val actif: Boolean,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        val record = EluRecord().apply {
            id = r.id.rawId
            civilite = r.civilite.name
            prenom = r.prenom
            nom = r.nom
            groupePolitique = r.groupePolitique
            groupePolitiqueCourt = r.groupePolitiqueCourt
            imageUrl = r.imageUrl
            actif = r.actif
            creationDate = r.creationDate
            lastModificationDate = r.lastModificationDate
        }
        jooq.insertInto(ELU).set(record).execute()
    }

    fun update(
        id: EluId,
        civilite: Civilite,
        prenom: String,
        nom: String,
        groupePolitique: String,
        groupePolitiqueCourt: String,
        imageUrl: String,
        actif: Boolean,
        lastModificationDate: Instant
    ) {
        val record = EluRecord().also {
            it.civilite = civilite.name
            it.prenom = prenom
            it.nom = nom
            it.groupePolitique = groupePolitique
            it.groupePolitiqueCourt = groupePolitiqueCourt
            it.imageUrl = imageUrl
            it.actif = actif
            it.lastModificationDate = lastModificationDate
        }
        jooq.update(ELU).set(record).where(ELU.ID.equal(id.rawId)).execute()
    }

    fun fetch(id: EluId) =
        jooq.selectFrom(ELU)
            .where(ELU.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::map)

    fun fetch(ids: Set<EluId>) =
        jooq.selectFrom(ELU)
            .where(ELU.ID.`in`(ids.map { it.rawId }))
            .fetch()
            .map(this::map)

    fun fetchAll() =
        jooq.selectFrom(ELU)
            .fetch()
            .map(this::map)

//    fun delete(id: EluId) {
//        jooq.delete(ELU)
//            .where(ELU.ID.equal(id.rawId))
//            .execute()
//    }

    private fun map(r: EluRecord) = Record(
        r.id.toTypeId(),
        Civilite.valueOf(r.civilite),
        r.prenom,
        r.nom,
        r.groupePolitique,
        r.groupePolitiqueCourt,
        r.imageUrl,
        r.actif,
        r.creationDate,
        r.lastModificationDate
    )

}
