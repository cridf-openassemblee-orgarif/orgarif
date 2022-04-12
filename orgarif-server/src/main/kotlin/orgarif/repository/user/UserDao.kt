package orgarif.repository.user

import java.time.Instant
import java.util.stream.Stream
import org.jooq.DSLContext
import org.springframework.dao.DuplicateKeyException
import org.springframework.stereotype.Repository
import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.error.MailAlreadyRegisteredException
import orgarif.jooq.generated.Keys.APP_USER_MAIL_KEY
import orgarif.jooq.generated.Tables.APP_USER
import orgarif.jooq.generated.tables.records.AppUserRecord
import orgarif.utils.toTypeId

@Repository
class UserDao(val jooq: DSLContext) {

    data class Record(
        val id: UserId,
        val mail: String,
        val username: String?,
        val displayName: String,
        val language: Language,
        val roles: Set<Role>,
        val signupDate: Instant,
        val lastUpdate: Instant
    ) {
        override fun toString() = "User($id|$mail)"
    }

    fun insert(r: Record, hashedPassword: HashedPassword) {
        val jr =
            AppUserRecord().apply {
                id = r.id.rawId
                mail = r.mail
                username = r.username
                password = hashedPassword.hash
                displayName = r.displayName
                language = r.language.name
                roles = r.roles.map { it.name }.toTypedArray()
                signupDate = r.signupDate
                lastUpdate = r.lastUpdate
            }

        try {
            jooq.insertInto(APP_USER).set(jr).execute()
        } catch (e: DuplicateKeyException) {
            handleDuplicateKeyException(e, r.mail)
        }
    }

    fun updateMail(id: UserId, mail: String, lastUpdateDate: Instant) {
        try {
            jooq.update(APP_USER)
                .set(APP_USER.MAIL, mail)
                .set(APP_USER.LAST_UPDATE, lastUpdateDate)
                .where(APP_USER.ID.equal(id.rawId))
                .execute()
        } catch (e: DuplicateKeyException) {
            handleDuplicateKeyException(e, mail)
        }
    }

    private fun handleDuplicateKeyException(e: DuplicateKeyException, mail: String) {
        val message = e.cause?.message
        if (message != null &&
            "duplicate key value violates unique constraint \"" + APP_USER_MAIL_KEY.name + "\"" in
                message) {
            throw MailAlreadyRegisteredException(mail)
        } else {
            throw e
        }
    }

    fun updatePassword(id: UserId, password: HashedPassword, lastUpdateDate: Instant) {
        jooq.update(APP_USER)
            .set(APP_USER.PASSWORD, password.hash)
            .set(APP_USER.LAST_UPDATE, lastUpdateDate)
            .where(APP_USER.ID.equal(id.rawId))
            .execute()
    }

    fun updateRoles(id: UserId, roles: Set<Role>, lastUpdateDate: Instant) {
        jooq.update(APP_USER)
            .set(APP_USER.ROLES, roles.map { it.name }.toTypedArray())
            .set(APP_USER.LAST_UPDATE, lastUpdateDate)
            .where(APP_USER.ID.equal(id.rawId))
            .execute()
    }

    fun doesMailExist(login: String): Boolean =
        jooq.selectCount().from(APP_USER).where(APP_USER.MAIL.equal(login)).fetchSingle().let {
            it.value1() > 0
        }

    fun fetchOrNull(id: UserId): Record? =
        jooq.selectFrom(APP_USER).where(APP_USER.ID.equal(id.rawId)).fetchOne()?.let(this::map)

    fun fetch(id: UserId): Record = fetchOrNull(id).let { requireNotNull(it) { "$id" } }

    fun fetchOrNullByMail(mail: String): Record? =
        jooq.selectFrom(APP_USER).where(APP_USER.MAIL.equal(mail)).fetchOne()?.let(this::map)

    fun fetchByMail(mail: String): Record =
        fetchOrNullByMail(mail).let { requireNotNull(it) { mail } }

    fun fetchPassword(id: UserId): HashedPassword =
        jooq.select(APP_USER.PASSWORD)
            .from(APP_USER)
            .where(APP_USER.ID.equal(id.rawId))
            .fetchOne()
            ?.value1()
            ?.let { HashedPassword(it) }
            .let { requireNotNull(it) { "$id" } }

    fun fetchMail(id: UserId): String =
        jooq.select(APP_USER.MAIL)
            .from(APP_USER)
            .where(APP_USER.ID.equal(id.rawId))
            .fetchOne()
            ?.let { it.value1() }
            .let { requireNotNull(it) { "$id" } }

    fun streamAll(): Stream<Record> = jooq.selectFrom(APP_USER).stream().map(this::map)

    fun map(r: AppUserRecord) =
        Record(
            id = r.id.toTypeId(),
            mail = r.mail,
            username = r.username,
            displayName = r.displayName,
            language = Language.valueOf(r.language),
            roles = r.roles.map { Role.valueOf(it) }.toSet(),
            signupDate = r.signupDate,
            lastUpdate = r.lastUpdate)
}
