package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.Civilite
import orgarif.domain.EluId
import orgarif.jooq.generated.tables.records.EluRecord
import orgarif.jooq.generated.tables.references.ELU
import orgarif.utils.toTypeId

@Repository
class EluDao(val jooq: DSLContext) {

    data class Record(
        val id: EluId,
        val civilite: Civilite,
        val prenom: String,
        val nom: String,
        val groupePolitique: String,
        val groupePolitiqueCourt: String,
        val imageUrl: String?,
        val actif: Boolean,
        val creationDate: Instant,
        val lastModificationDate: Instant
    )

    fun insert(r: Record) {
        jooq
            .insertInto(ELU)
            .set(
                EluRecord(
                    id = r.id.rawId,
                    civilite = r.civilite.name,
                    prenom = r.prenom,
                    nom = r.nom,
                    groupePolitique = r.groupePolitique,
                    groupePolitiqueCourt = r.groupePolitiqueCourt,
                    imageUrl = r.imageUrl,
                    actif = r.actif,
                    creationDate = r.creationDate,
                    lastModificationDate = r.lastModificationDate))
            .execute()
    }

    fun update(
        id: EluId,
        civilite: Civilite,
        prenom: String,
        nom: String,
        groupePolitique: String,
        groupePolitiqueCourt: String,
        imageUrl: String?,
        actif: Boolean,
        lastModificationDate: Instant
    ) {
        jooq
            .update(ELU)
            .set(ELU.CIVILITE, civilite.name)
            .set(ELU.PRENOM, prenom)
            .set(ELU.NOM, nom)
            .set(ELU.GROUPE_POLITIQUE, groupePolitique)
            .set(ELU.GROUPE_POLITIQUE_COURT, groupePolitiqueCourt)
            .set(ELU.IMAGE_URL, imageUrl)
            .set(ELU.ACTIF, actif)
            .set(ELU.LAST_MODIFICATION_DATE, lastModificationDate)
            .where(ELU.ID.equal(id.rawId))
            .execute()
    }

    fun fetch(id: EluId) =
        jooq.selectFrom(ELU).where(ELU.ID.equal(id.rawId)).fetchOne()?.let(this::map)

    fun fetch(ids: Set<EluId>) =
        jooq.selectFrom(ELU).where(ELU.ID.`in`(ids.map { it.rawId })).fetch().map(this::map)

    fun fetchAll() = jooq.selectFrom(ELU).fetch().map(this::map)

    //    fun delete(id: EluId) {
    //        jooq.delete(ELU)
    //            .where(ELU.ID.equal(id.rawId))
    //            .execute()
    //    }

    private fun map(r: EluRecord) =
        Record(
            r.id.toTypeId(),
            Civilite.valueOf(r.civilite),
            r.prenom,
            r.nom,
            r.groupePolitique,
            r.groupePolitiqueCourt,
            r.imageUrl,
            r.actif,
            r.creationDate,
            r.lastModificationDate)
}
