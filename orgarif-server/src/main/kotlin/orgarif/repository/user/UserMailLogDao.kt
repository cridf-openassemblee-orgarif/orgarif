package orgarif.repository.user

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.UserId
import orgarif.domain.UserMailLogId
import orgarif.domain.UserMailLogType
import orgarif.jooq.generated.Tables.USER_MAIL_LOG
import orgarif.jooq.generated.tables.records.UserMailLogRecord

@Repository
class UserMailLogDao(val jooq: DSLContext) {

    data class Record(
        val id: UserMailLogId,
        val userId: UserId,
        val mail: String,
        val type: UserMailLogType,
        val creationDate: Instant
    ) {
        override fun toString() = "User($id|$mail)"
    }

    fun insert(r: Record) {
        val jr =
            UserMailLogRecord().apply {
                id = r.id.rawId
                userId = r.userId.rawId
                mail = r.mail
                type = r.type.name
                creationDate = r.creationDate
            }

        jooq.insertInto(USER_MAIL_LOG).set(jr).execute()
    }
}
