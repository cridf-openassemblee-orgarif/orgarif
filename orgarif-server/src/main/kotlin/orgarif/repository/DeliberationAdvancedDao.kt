package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeId
import orgarif.jooq.generated.Tables.DELIBERATION
import orgarif.jooq.generated.Tables.LIEN_DELIBERATION

@Repository
class DeliberationAdvancedDao(
    val jooq: DSLContext,
    val deliberationDao: DeliberationDao,
    val lienDeliberationDao: LienDeliberationDao
) {

    fun fetchDeliberationByOrganismeId(
        organismeId: OrganismeId
    ): List<Pair<LienDeliberationDao.Record, DeliberationDao.Record>> {
        val d = DELIBERATION.`as`("d")
        val l = LIEN_DELIBERATION.`as`("l")
        return jooq.select()
            .from(d)
            .join(l)
            .on(d.ID.equal(l.DELIBERATION_ID))
            .where(l.ORGANISME_ID.equal(organismeId.rawId))
            .and(l.STATUS.equal(ItemStatus.live.name))
            .fetch()
            .map {
                val deliberation = deliberationDao.map(it.into(d))
                val lien = lienDeliberationDao.map(it.into(l))
                lien to deliberation
            }
    }
}
