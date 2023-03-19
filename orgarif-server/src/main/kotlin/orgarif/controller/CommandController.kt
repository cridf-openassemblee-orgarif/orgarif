package orgarif.controller

import java.time.Instant
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.apache.commons.lang3.exception.ExceptionUtils
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import orgarif.command.AdminUpdateRolesCommand
import orgarif.command.AdminUpdateRolesCommandHandler
import orgarif.command.Command
import orgarif.command.CommandConfiguration
import orgarif.command.CommandHandler
import orgarif.command.CommandResponse
import orgarif.command.DevLoginCommand
import orgarif.command.DevLoginCommandHandler
import orgarif.command.EmptyCommandResponse
import orgarif.command.LoginCommand
import orgarif.command.LoginCommandHandler
import orgarif.command.RegisterCommand
import orgarif.command.RegisterCommandHandler
import orgarif.command.UpdatePasswordCommand
import orgarif.command.UpdatePasswordCommandHandler
import orgarif.domain.UserId
import orgarif.repository.log.CommandLogDao
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.DateService
import orgarif.service.utils.TransactionIsolationService
import orgarif.service.utils.random.IdLogService
import orgarif.service.utils.random.RandomService

@RestController
class CommandController(
    private val commandLogDao: CommandLogDao,
    private val dateService: DateService,
    private val randomService: RandomService,
    private val idLogService: IdLogService,
    private val userSessionService: UserSessionService,
    private val adminUpdateRolesCommandHandler: AdminUpdateRolesCommandHandler,
    private val devLoginCommandHandler: DevLoginCommandHandler,
    private val loginCommandHandler: LoginCommandHandler,
    private val registerCommandHandler: RegisterCommandHandler,
    private val updatePasswordCommandHandler: UpdatePasswordCommandHandler,
    private val transactionIsolationService: TransactionIsolationService,
) {

    private val logger = KotlinLogging.logger {}

    // TODO[tmpl][test] test these transactions & stacktrace logging !
    @PostMapping("/command")
    fun handle(
        @RequestBody jsonCommand: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): CommandResponse? {
        val command = Serializer.deserialize<Command>(jsonCommand)
        val handler = handler(command)

        // [doc] is filtered from sensitive data (passwords) thanks to serialization
        val filteredJsonCommand = Serializer.serialize(command)
        // TODO[tmpl][test] make an only insert at the end, with no update ?
        // or make an insert first to protect from some errors (? isolate its transactionl)
        val draftCommandLog =
            CommandLogDao.Record(
                id = randomService.id(),
                userId = null, // set later
                affectedUserId = affectedUserId(command),
                deploymentLogId = ApplicationInstance.deploymentLogId,
                commandClass = command.javaClass,
                jsonCommand = filteredJsonCommand,
                // the ip can evolve within a session, it makes sense to save it here
                ip = request.remoteAddr,
                userSessionId = null,
                idsLog = "",
                jsonResult = null,
                exceptionStackTrace = null,
                startDate = dateService.now(),
                endDate = Instant.ofEpochMilli(0))
        try {
            userSessionService.verifyRoleOrFail(
                CommandConfiguration.role(command), request.remoteAddr, command.javaClass)
            idLogService.enableLogging()
            val result =
                transactionIsolationService.execute {
                    handler.handle(command, getSession(), request, response)
                }
            // [doc] because of login, register...
            val updatedSession = getSession()
            commandLogDao.insert(
                draftCommandLog.copy(
                    userId = updatedSession?.userId,
                    userSessionId = updatedSession?.sessionId,
                    idsLog = idLogService.getIdsString(),
                    jsonResult =
                        if (result !is EmptyCommandResponse) Serializer.serialize(result) else null,
                    endDate = dateService.now()))
            return result
        } catch (e: Exception) {
            val updatedSession = getSession()
            commandLogDao.insert(
                draftCommandLog.copy(
                    userId = updatedSession?.userId,
                    userSessionId = updatedSession?.sessionId,
                    idsLog = idLogService.getIdsString(),
                    exceptionStackTrace = ExceptionUtils.getStackTrace(e),
                    endDate = dateService.now()))
            throw e
        } finally {
            idLogService.clean()
        }
    }

    private fun getSession() =
        if (userSessionService.isAuthenticated()) userSessionService.getUserSession() else null

    private fun handler(command: Command) =
        when (command) {
            is AdminUpdateRolesCommand -> adminUpdateRolesCommandHandler
            is DevLoginCommand -> devLoginCommandHandler
            is LoginCommand -> loginCommandHandler
            is UpdatePasswordCommand -> updatePasswordCommandHandler
            is RegisterCommand -> registerCommandHandler
        }.let { @Suppress("UNCHECKED_CAST") (it as CommandHandler<Command, CommandResponse>) }

    // for admin commands, should return the affected user when there's one
    private fun affectedUserId(command: Command): UserId? =
        when (command) {
            is DevLoginCommand,
            is LoginCommand,
            is UpdatePasswordCommand,
            is RegisterCommand -> null
            is AdminUpdateRolesCommand -> command.userId
        }
}
