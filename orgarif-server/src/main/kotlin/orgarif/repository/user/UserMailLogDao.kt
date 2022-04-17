package orgarif.repository.user

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.AuthLogId
import orgarif.domain.AuthLogType
import orgarif.domain.UserId
import orgarif.jooq.generated.Tables.USER_MAIL_LOG
import orgarif.jooq.generated.tables.records.UserMailLogRecord

@Repository
class UserMailLogDao(val jooq: DSLContext) {

    data class Record(
        val id: AuthLogId,
        val userId: UserId,
        val mail: String,
        val type: AuthLogType,
        val creationDate: Instant
    )

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
