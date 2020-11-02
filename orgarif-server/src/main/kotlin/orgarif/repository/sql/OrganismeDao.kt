package orgarif.repository.sql


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
import java.time.ZoneOffset

@Repository
class OrganismeDao(val jooq: DSLContext) {

    data class Record(val id: OrganismeId,
                      val nom: String,
                      val secteurId: SecteurId?,
                      val natureJuridiqueId: NatureJuridiqueId?,
                      val typeStructureId: TypeStructureId?,
                      val nombreRepresentants: Int?,
                      val nombreSuppleants: Int?,
                      val partageRepresentants: Boolean,
                      val creationDate: Instant,
                      val lastModificationDate: Instant)

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
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            lastModificationDate = r.lastModificationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        }
        val test = "test" as String?
        test
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

    fun fetchAll() =
            jooq.selectFrom(ORGANISME)
                    .fetch()
                    .map(this::map)

    private fun map(r: OrganismeRecord) = Record(
            r.id.toTypeId(),
            r.nom,
            r.secteurId.toTypeId(),
            r.natureJuridiqueId.toTypeId(),
            r.typeStructureId.toTypeId(),
            r.nombreRepresentants,
            r.nombreSuppleants,
            r.partageRepresentants,
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.lastModificationDate.toInstant(ZoneOffset.UTC))

}
