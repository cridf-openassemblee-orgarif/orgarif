package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.UserId
import orgarif.jooq.generated.Tables.MAGIC_LINK_TOKEN
import orgarif.jooq.generated.tables.records.MagicLinkTokenRecord
import orgarif.utils.toTypeId
import java.lang.IllegalArgumentException

import java.time.Instant
import java.time.ZoneOffset

@Repository
class MagicLinkTokenDao(val jooq: DSLContext) {

    data class Record(val token: String,
                      val userId: UserId,
                      val creationDate: Instant,
                      val validity: Boolean)

    fun insert(r: Record) {
        val record = MagicLinkTokenRecord().apply {
            token = r.token
            userId = r.userId.rawId
            creationDate = r.creationDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            validity = r.validity
        }
        jooq.insertInto(MAGIC_LINK_TOKEN).set(record).execute()
    }

    fun fetchOrNull(magicToken: String) =
            jooq.selectFrom(MAGIC_LINK_TOKEN)
                    .where(MAGIC_LINK_TOKEN.TOKEN.equal(magicToken))
                    .fetchOne()
                    ?.let(this::map)

    fun updateValidity(token: String, validity: Boolean) {
        jooq.update(MAGIC_LINK_TOKEN)
                .set(MAGIC_LINK_TOKEN.VALIDITY, validity)
                .where(MAGIC_LINK_TOKEN.TOKEN.equal(token))
                .execute()
    }

    private fun map(r: MagicLinkTokenRecord) = Record(
            r.token,
            r.userId.toTypeId(),
            r.creationDate.toInstant(ZoneOffset.UTC),
            r.validity)

}