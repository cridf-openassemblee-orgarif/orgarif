package orgarif.repository.user

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.AuthLogType
import orgarif.domain.UserId
import orgarif.domain.UserMailLogId
import orgarif.jooq.generated.tables.records.UserMailLogRecord
import orgarif.jooq.generated.tables.references.USER_MAIL_LOG

@Repository
class UserMailLogDao(private val jooq: DSLContext) {

    data class Record(
        val id: UserMailLogId,
        val userId: UserId,
        val mail: String,
        val type: AuthLogType,
        val creationDate: Instant
    )

    fun insert(r: Record) {
        jooq
            .insertInto(USER_MAIL_LOG)
            .set(
                UserMailLogRecord(
                    id = r.id.rawId,
                    userId = r.userId.rawId,
                    mail = r.mail,
                    type = r.type.name,
                    creationDate = r.creationDate))
            .execute()
    }
}
