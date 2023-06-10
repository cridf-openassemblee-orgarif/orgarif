package orgarif.repository.user

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeploymentLogId
import orgarif.domain.UserId
import orgarif.domain.UserSessionId
import orgarif.jooq.generated.tables.records.UserSessionLogRecord
import orgarif.jooq.generated.tables.references.USER_SESSION_LOG
import orgarif.utils.toTypeId

// TODO[tmpl][user]: try to keep Spring id
@Repository
class UserSessionLogDao(private val jooq: DSLContext) {

    data class Record(
        val id: UserSessionId,
        val springSessionId: String,
        val userId: UserId,
        val deploymentLogId: DeploymentLogId,
        val creationDate: Instant,
        val ip: String
    )

    fun insert(r: Record) {
        jooq
            .insertInto(USER_SESSION_LOG)
            .set(
                UserSessionLogRecord(
                    id = r.id.rawId,
                    springSessionId = r.springSessionId,
                    userId = r.userId.rawId,
                    deploymentLogId = r.deploymentLogId.rawId,
                    creationDate = r.creationDate,
                    ip = r.ip))
            .execute()
    }

    fun fetchIdsByUserId(userId: UserId): List<UserSessionId> =
        jooq
            .select(USER_SESSION_LOG.ID)
            .from(USER_SESSION_LOG)
            .where(USER_SESSION_LOG.USER_ID.equal(userId.rawId))
            .fetch()
            .map { requireNotNull(it.component1()).toTypeId() }
}
