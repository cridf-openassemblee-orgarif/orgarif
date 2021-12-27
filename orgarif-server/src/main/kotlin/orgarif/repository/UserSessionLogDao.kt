package orgarif.repository

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeploymentLogId
import orgarif.domain.UserId
import orgarif.domain.UserSessionId
import orgarif.jooq.generated.Tables.USER_SESSION_LOG
import orgarif.jooq.generated.tables.records.UserSessionLogRecord
import orgarif.utils.toTypeId

// TODO[user] : try to keep Spring id
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
        val lr =
            UserSessionLogRecord().apply {
                id = r.id.rawId
                springSessionId = r.springSessionId
                userId = r.userId.rawId
                deploymentLogId = r.deploymentLogId.rawId
                date = r.date
                ip = r.ip
            }
        jooq.insertInto(USER_SESSION_LOG).set(lr).execute()
    }

    fun fetchIdsByUserId(userId: UserId): List<UserSessionId> =
        jooq
            .select(USER_SESSION_LOG.ID)
            .from(USER_SESSION_LOG)
            .where(USER_SESSION_LOG.USER_ID.equal(userId.rawId))
            .fetch()
            .map { it.component1().toTypeId() }
}
