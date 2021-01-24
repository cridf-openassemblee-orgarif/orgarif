package orgarif.repository

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeploymentLogId
import orgarif.domain.UserId
import orgarif.domain.UserSessionId
import orgarif.jooq.generated.Tables.USER_SESSION_LOG
import orgarif.jooq.generated.tables.records.UserSessionLogRecord
import java.time.Instant

// TODO[user] : essayer keep id de spring
@Repository
class UserSessionLogDao(val jooq: DSLContext) {

    data class Record(
        val id: UserSessionId,
        val springSessionId: String,
        val userId: UserId,
        val deploymentLogId: DeploymentLogId,
        val date: Instant,
        val ip: String
    )

    fun insert(r: Record) {
        val lr = UserSessionLogRecord().apply {
            id = r.id.rawId
            springSessionId = r.springSessionId
            userId = r.userId.rawId
            deploymentLogId = r.deploymentLogId.rawId
            date = r.date
            ip = r.ip
        }
        jooq.insertInto(USER_SESSION_LOG).set(lr).execute()
    }

}
