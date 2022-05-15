package orgarif.repository.log

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.CommandLogId
import orgarif.domain.DeploymentLogId
import orgarif.domain.UserId
import orgarif.domain.UserSessionId
import orgarif.jooq.generated.Tables.COMMAND_LOG
import orgarif.jooq.generated.tables.records.CommandLogRecord
import orgarif.utils.toTypeId

@Repository
class CommandLogDao(val jooq: DSLContext) {

    data class Record(
        val id: CommandLogId,
        val userId: UserId?,
        val deploymentLogId: DeploymentLogId,
        val commandClass: Class<*>,
        val jsonCommand: String,
        val ip: String,
        val userSessionId: UserSessionId?,
        val resultingIds: String?,
        val jsonResult: String?,
        val exceptionStackTrace: String?,
        val startDate: Instant,
        val endDate: Instant?
    )

    fun insert(r: Record) {
        val jr =
            CommandLogRecord().apply {
                id = r.id.rawId
                userId = r.userId?.rawId
                deploymentLogId = r.deploymentLogId.rawId
                commandClass = r.commandClass.name
                jsonCommand = r.jsonCommand
                ip = r.ip
                userSessionId = r.userSessionId?.rawId
                resultingIds = r.resultingIds
                jsonResult = r.jsonResult
                exceptionStackTrace = r.exceptionStackTrace
                startDate = r.startDate
                endDate = r.endDate
            }
        jooq.insertInto(COMMAND_LOG).set(jr).execute()
    }

    fun updateExceptionStackTrace(id: CommandLogId, exceptionStackTrace: String, endDate: Instant) {
        jooq
            .update(COMMAND_LOG)
            .set(COMMAND_LOG.EXCEPTION_STACK_TRACE, exceptionStackTrace)
            .set(COMMAND_LOG.END_DATE, endDate)
            .where(COMMAND_LOG.ID.equal(id.rawId))
            .execute()
    }

    fun updateResult(
        id: CommandLogId,
        user: Pair<UserId, UserSessionId>?,
        resultingIds: String,
        jsonResult: String?,
        endDate: Instant
    ) {
        jooq
            .update(COMMAND_LOG)
            .also {
                if (user != null) {
                    it.set(COMMAND_LOG.USER_ID, user.first.rawId)
                    it.set(COMMAND_LOG.USER_SESSION_ID, user.second.rawId)
                }
            }
            .set(COMMAND_LOG.RESULTING_IDS, resultingIds)
            .set(COMMAND_LOG.JSON_RESULT, jsonResult)
            .set(COMMAND_LOG.END_DATE, endDate)
            .where(COMMAND_LOG.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: CommandLogRecord) =
        Record(
            id = r.id.toTypeId(),
            userId = r.userId?.toTypeId(),
            deploymentLogId = r.deploymentLogId.toTypeId(),
            commandClass = Class.forName(r.commandClass),
            jsonCommand = r.jsonCommand,
            ip = r.ip,
            userSessionId = r.userSessionId?.toTypeId(),
            resultingIds = r.resultingIds,
            jsonResult = r.jsonResult,
            exceptionStackTrace = r.exceptionStackTrace,
            startDate = r.startDate,
            endDate = r.endDate)
}
