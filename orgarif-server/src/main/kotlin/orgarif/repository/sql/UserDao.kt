package orgarif.repository.sql

import org.jooq.DSLContext
import org.jooq.impl.DSL.lower
import org.springframework.dao.DuplicateKeyException
import org.springframework.stereotype.Repository
import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.UserId
import orgarif.error.MailAlreadyRegisteredException
import orgarif.jooq.generated.Tables.APP_USER
import orgarif.jooq.generated.tables.records.AppUserRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.time.ZoneOffset

@Repository
class UserDao(val jooq: DSLContext) {

    data class Record(val id: UserId,
                      val mail: String,
                      val username: String?,
                      val language: Language,
                      val admin: Boolean,
                      val signupDate: Instant,
            // [doc] because some mail provider could choose to support character which usually aren't
            // differentiated from another or usually just supported
            // TODO[user] ou osef, trace est gardée dans le command log ?
            // d'autant plus que formerMails ne va pas garder les deux...
                      val dirtyMail: String?) {
        override fun toString() = "User($id|$mail)"
    }

    @Throws(MailAlreadyRegisteredException::class)
    fun insert(r: Record, hashedPassword: HashedPassword) {
        val aur = AppUserRecord().apply {
            id = r.id.rawId
            mail = r.mail
            username = r.username
            password = hashedPassword.hash
            language = r.language.name
            signupDate = r.signupDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
            admin = r.admin
            dirtyMail = r.dirtyMail
        }

        try {
            jooq.insertInto(APP_USER).set(aur).execute()
        } catch (e: DuplicateKeyException) {
            handleDuplicateKeyException(e, r.mail)
        }
    }

    private fun handleDuplicateKeyException(e: DuplicateKeyException, mail: String) {
        val message = e.cause?.message
        if (message != null && "for key 'mail'" in message) {
            throw MailAlreadyRegisteredException(mail)
        } else {
            throw e
        }
    }

    fun updatePassword(id: UserId, password: HashedPassword) {
        jooq.update(APP_USER)
                .set(APP_USER.PASSWORD, password.hash)
                .where(APP_USER.ID.equal(id.rawId))
                .execute()
    }

    fun fetch(id: UserId) =
            jooq.selectFrom(APP_USER)
                    .where(APP_USER.ID.equal(id.rawId))
                    .fetchOne()
                    ?.let(this::map)

    fun doesLoginExist(login: String): Boolean =
            jooq.selectCount()
                    .from(APP_USER)
                    .where(APP_USER.MAIL.equal(login))
                    .or(APP_USER.USERNAME.equal(login))
                    .fetchSingle()
                    .let { it.value1() > 0 }

    fun fetchByMail(mail: String): Record? =
            jooq.selectFrom(APP_USER)
                    .where(APP_USER.MAIL.equal(mail))
                    .fetchOne()
                    ?.let(this::map)

    fun fetchByUsername(username: String): Record? =
            jooq.selectFrom(APP_USER)
                    .where(lower(APP_USER.USERNAME).equal(lower(username)))
                    .fetchOne()
                    ?.let(this::map)

    fun fetchPassword(id: UserId): HashedPassword? =
            jooq.select(APP_USER.PASSWORD)
                    .from(APP_USER)
                    .where(APP_USER.ID.equal(id.rawId))
                    .fetchOne()
                    ?.value1()
                    ?.let { HashedPassword(it) }

    fun map(r: AppUserRecord) = Record(
            id = r.id.toTypeId(),
            mail = r.mail,
            username = r.username,
            language = Language.valueOf(r.language),
            signupDate = r.signupDate.toInstant(ZoneOffset.UTC),
            admin = r.admin,
            dirtyMail = r.dirtyMail)

}
