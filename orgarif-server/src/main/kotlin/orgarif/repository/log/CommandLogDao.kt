package orgarif.repository.log

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.CommandLogId
import orgarif.domain.DeploymentLogId
import orgarif.domain.UserId
import orgarif.domain.UserSessionId
import orgarif.jooq.generated.tables.records.CommandLogRecord
import orgarif.jooq.generated.tables.references.COMMAND_LOG
import orgarif.utils.toTypeId

@Repository
class CommandLogDao(private val jooq: DSLContext) {

    data class Record(
        val id: CommandLogId,
        val userId: UserId?,
        val affectedUserId: UserId?,
        val deploymentLogId: DeploymentLogId,
        val commandClass: Class<*>,
        val jsonCommand: String,
        val ip: String,
        val userSessionId: UserSessionId?,
        val idsLog: String,
        val jsonResult: String?,
        val exceptionStackTrace: String?,
        val startDate: Instant,
        val endDate: Instant
    )

    fun insert(r: Record) {
        jooq
            .insertInto(COMMAND_LOG)
            .set(
                CommandLogRecord(
                    id = r.id.rawId,
                    userId = r.userId?.rawId,
                    affectedUserId = r.affectedUserId?.rawId,
                    deploymentLogId = r.deploymentLogId.rawId,
                    commandClass = r.commandClass.name,
                    jsonCommand = r.jsonCommand,
                    ip = r.ip,
                    userSessionId = r.userSessionId?.rawId,
                    idsLog = r.idsLog,
                    jsonResult = r.jsonResult,
                    exceptionStackTrace = r.exceptionStackTrace,
                    startDate = r.startDate,
                    endDate = r.endDate,
                ))
            .execute()
    }

    private fun map(r: CommandLogRecord) =
        Record(
            id = r.id.toTypeId(),
            userId = r.userId?.toTypeId(),
            affectedUserId = r.affectedUserId?.toTypeId(),
            deploymentLogId = r.deploymentLogId.toTypeId(),
            commandClass = Class.forName(r.commandClass),
            jsonCommand = r.jsonCommand,
            ip = r.ip,
            userSessionId = r.userSessionId?.toTypeId(),
            idsLog = r.idsLog,
            jsonResult = r.jsonResult,
            exceptionStackTrace = r.exceptionStackTrace,
            startDate = r.startDate,
            endDate = r.endDate)
}
