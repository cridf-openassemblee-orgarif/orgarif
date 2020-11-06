package orgarif.endpoint

import mu.KotlinLogging
import orgarif.command.*
import orgarif.domain.AuthenticationLevel
import orgarif.domain.CommandLogId
import orgarif.error.OrgarifSecurityException
import orgarif.repository.sql.CommandLogDao
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.service.user.IpService
import orgarif.service.user.UserSessionHelper
import orgarif.utils.Serializer.deserialize
import orgarif.utils.Serializer.serialize
import org.apache.commons.lang3.exception.ExceptionUtils
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
class CommandController(
        val commandLogDao: CommandLogDao,
        val applicationInstance: ApplicationInstance,
        val ipService: IpService,
        val dateService: DateService,
        val randomService: RandomService,
        val transactionManager: PlatformTransactionManager,

        val createOrganismeCommandHandler: CreateOrganismeCommandHandler,
        val loginCommandHandler: LoginCommandHandler,
        val registerCommandHandler: RegisterCommandHandler,
        val updateOrganismeNatureJuridiqueCommandHandler: UpdateOrganismeNatureJuridiqueCommandHandler,
        val updateOrganismeSecteurCommandHandler: UpdateOrganismeSecteurCommandHandler,
        val updateOrganismeTypeStructureCommandCommandHandler: UpdateOrganismeTypeStructureCommandHandler,
) {

    private val logger = KotlinLogging.logger {}

    // TODO[test] serait BIEN de blinder de test ces transactions & stacktrace logging =s
    @PostMapping("/command")
    fun handle(@RequestBody jsonCommand: String,
               request: HttpServletRequest,
               response: HttpServletResponse): CommandResponse? {
        val command = deserialize<Command>(jsonCommand)
        val handler = handler(command)
        val userSession = if (UserSessionHelper.isAuthenticated()) UserSessionHelper.getUserSession() else null
        // [doc] is filtered from sensitive data (passwords) because of serializers
        val filteredJsonCommand = serialize(command)
        // l'ip peut évoluer au sein de la même session, a du sens de le réenregistrer ici
        // TODO[test] faire insert après en one shot putain ?
        // [doc] first si doit se planter trop serieusement ? peut arriver ?
        val commandLogId = CommandLogId(randomService.randomUUID())
        commandLogDao.insert(CommandLogDao.Record(
                id = commandLogId,
                userId = userSession?.userId,
                deploymentLogId = applicationInstance.deploymentId,
                commandClass = command.javaClass,
                jsonCommand = filteredJsonCommand,
                date = dateService.now(),
                ip = ipService.getClientIp(request),
                userSessionId = userSession?.sessionId,
                jsonResult = null,
                exceptionStackTrace = null))
        val transaction = transactionManager.getTransaction(null)
        try {
            val result = when (CommandConfiguration.authenticationLevel(command)) {
                AuthenticationLevel.loggedOut -> {
                    if (userSession != null) {
                        throw RuntimeException()
                    }
                    handler.handle(command, null, request, response)
                }
                AuthenticationLevel.neutral ->
                    handler.handle(command, userSession, request, response)
                AuthenticationLevel.loggedIn -> {
                    // TODO[secu] un peu double sécu car implem dans les classes aussi mais bon
                    // ou alors pas la meme exception
                    if (userSession == null) {
                        throw RuntimeException()
                    }
                    handler.handle(command, userSession, request, response)
                }
                AuthenticationLevel.admin -> {
                    if (!UserSessionHelper.isAdmin()) {
                        throw OrgarifSecurityException("$userSession ${command.javaClass.simpleName}")
                    }
                    handler.handle(command, userSession, request, response)
                }
            }
            transactionManager.commit(transaction)
            if (result !is EmptyCommandResponse) {
                try {
                    commandLogDao.updateResult(commandLogId, serialize(result))
                } catch (e: Exception) {
                    logger.error(e) { "Exception in command result log..." }
                }
            }
            return result
        } catch (e: Exception) {
            transactionManager.rollback(transaction)
            try {
                commandLogDao.updateExceptionStackTrace(commandLogId, ExceptionUtils.getStackTrace(e))
            } catch (e2: Exception) {
                logger.error(e2) { "Exception in command exception log..." }
            }
            throw e
        }
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(command: Command): CommandHandler<Command, CommandResponse> = when (command) {
        is CreateOrganismeCommand -> createOrganismeCommandHandler
        is LoginCommand -> loginCommandHandler
        is RegisterCommand -> registerCommandHandler
        is UpdateOrganismeNatureJuridiqueCommand -> updateOrganismeNatureJuridiqueCommandHandler
        is UpdateOrganismeSecteurCommand -> updateOrganismeSecteurCommandHandler
        is UpdateOrganismeTypeStructureCommand -> updateOrganismeTypeStructureCommandCommandHandler
    } as CommandHandler<Command, CommandResponse>

}
