package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.CommandLogId
import orgarif.domain.DeploymentLogId
import orgarif.domain.UserId
import orgarif.domain.UserSessionId
import orgarif.jooq.generated.Tables.COMMAND_LOG
import orgarif.jooq.generated.tables.records.CommandLogRecord
import orgarif.utils.toTypeId
import java.time.Instant

@Repository
class CommandLogDao(val jooq: DSLContext) {

    data class Record(
        val id: CommandLogId,
        val userId: UserId?,
        val deploymentLogId: DeploymentLogId,
        val commandClass: Class<*>,
        val jsonCommand: String,
        val date: Instant,
        val ip: String,
        val userSessionId: UserSessionId?,
        val jsonResult: String?,
        val exceptionStackTrace: String?
    )

    fun insert(r: Record) {
        val clr = CommandLogRecord().apply {
            id = r.id.rawId
            userId = r.userId?.rawId
            deploymentLogId = r.deploymentLogId.rawId
            commandClass = r.commandClass.name
            jsonCommand = r.jsonCommand
            date = r.date
            ip = r.ip
            userSessionId = r.userSessionId?.rawId
        }
        jooq.insertInto(COMMAND_LOG).set(clr).execute()
    }

    fun updateExceptionStackTrace(id: CommandLogId, exceptionStackTrace: String) {
        jooq.update(COMMAND_LOG)
            .set(COMMAND_LOG.EXCEPTION_STACK_TRACE, exceptionStackTrace)
            .where(COMMAND_LOG.ID.equal(id.rawId))
            .execute()
    }

    fun updateResult(id: CommandLogId, jsonResult: String) {
        jooq.update(COMMAND_LOG)
            .set(COMMAND_LOG.JSON_RESULT, jsonResult)
            .where(COMMAND_LOG.ID.equal(id.rawId))
            .execute()
    }

    private fun map(r: CommandLogRecord) = Record(
        r.id.toTypeId(),
        r.userId?.toTypeId(),
        r.deploymentLogId.toTypeId(),
        Class.forName(r.commandClass),
        r.jsonCommand,
        r.date,
        r.ip,
        r.userSessionId?.toTypeId(),
        r.jsonResult,
        r.exceptionStackTrace
    )

}
