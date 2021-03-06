package orgarif.controller

import mu.KotlinLogging
import org.apache.commons.lang3.exception.ExceptionUtils
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import orgarif.command.*
import orgarif.domain.AuthenticationLevel
import orgarif.domain.CommandLogId
import orgarif.error.OrgarifSecurityException
import orgarif.repository.CommandLogDao
import orgarif.repository.UserDao
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.IdCreationLoggerService
import orgarif.service.RandomService
import orgarif.service.user.UserSessionHelper
import orgarif.utils.Serializer.deserialize
import orgarif.utils.Serializer.serialize
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
class CommandController(
    val commandLogDao: CommandLogDao,
    val userDao: UserDao,

    val applicationInstance: ApplicationInstance,
    val dateService: DateService,
    val randomService: RandomService,
    val transactionManager: PlatformTransactionManager,
    val idCreationLoggerService: IdCreationLoggerService,

    val addInstanceCommandHandler: AddInstanceCommandHandler,
    val addLienDeliberationCommandHandler: AddLienDeliberationCommandHandler,
    val addRepresentantCommandHandler: AddRepresentantCommandHandler,
    val createDeliberationAndAddLienCommandHandler: CreateDeliberationAndAddLienCommandHandler,
    val createOrganismeCommandHandler: CreateOrganismeCommandHandler,
    val deleteInstanceCommandHandler: DeleteInstanceCommandHandler,
    val deleteRepresentantCommandHandler: DeleteRepresentantCommandHandler,
    val loginCommandHandler: LoginCommandHandler,
    val moveRepresentantCommandHandler: MoveRepresentantCommandHandler,
    val registerCommandHandler: RegisterCommandHandler,
    val updateOrganismeNatureJuridiqueCommandHandler: UpdateOrganismeNatureJuridiqueCommandHandler,
    val updateOrganismePartageRepresentantsCommandHandler: UpdateOrganismePartageRepresentantsCommandHandler,
    val updateOrganismeSecteurCommandHandler: UpdateOrganismeSecteurCommandHandler,
    val updateOrganismeTypeStructureCommandCommandHandler: UpdateOrganismeTypeStructureCommandHandler,
) {

    private val logger = KotlinLogging.logger {}

    // TODO[test] serait BIEN de blinder de test ces transactions & stacktrace logging =s
    @PostMapping("/command")
    fun handle(
        @RequestBody jsonCommand: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): CommandResponse? {
        val command = deserialize<Command>(jsonCommand)
        val handler = handler(command)
        val userSession = if (UserSessionHelper.isAuthenticated()) UserSessionHelper.getUserSession() else null
        // [doc] is filtered from sensitive data (passwords) because of serializers
        val filteredJsonCommand = serialize(command)
        // l'ip peut évoluer au sein de la même session, a du sens de le réenregistrer ici
        // TODO[test] faire insert après en one shot putain ?
        // [doc] first si doit se planter trop serieusement ? peut arriver ?
        val commandLogId = randomService.id<CommandLogId>()
        commandLogDao.insert(
            CommandLogDao.Record(
                id = commandLogId,
                userId = userSession?.userId,
                deploymentLogId = applicationInstance.deploymentId,
                commandClass = command.javaClass,
                jsonCommand = filteredJsonCommand,
                ip = request.remoteAddr,
                userSessionId = userSession?.sessionId,
                resultingIds = null,
                jsonResult = null,
                exceptionStackTrace = null,
                startDate = dateService.now(),
                endDate = null
            )
        )
        val transaction = transactionManager.getTransaction(null)

        try {
            idCreationLoggerService.enableLogging()
            val result = when (CommandConfiguration.authenticationLevel(command)) {
                AuthenticationLevel.anonymous ->
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
                    // FIXMENOW ici should use UserSessionHelper mais tire question du userDao
                    // set virer dépendance à UserDao
//                    if (!UserSessionHelper.isAdmin()) {
//                        throw OrgarifSecurityException("$userSession ${command.javaClass.simpleName}")
//                    }
                    if (!UserSessionHelper.isAuthenticated()) {
                        throw OrgarifSecurityException("$userSession ${command.javaClass.simpleName}")
                    }
                    let {
                        val user = UserSessionHelper.getUserSession().userId.let {
                            userDao.fetch(it)
                                ?: throw IllegalArgumentException("$it")
                        }
                        if (!user.admin) {
                            throw OrgarifSecurityException("$userSession ${command.javaClass.simpleName}")
                        }
                    }
                    handler.handle(command, userSession, request, response)
                }
            }
            transactionManager.commit(transaction)
            if (result !is EmptyCommandResponse) {
                try {
                    commandLogDao.updateResult(
                        commandLogId,
                        idCreationLoggerService.getIdsString(),
                        serialize(result),
                        dateService.now()
                    )
                } catch (e: Exception) {
                    logger.error(e) { "Exception in command result log..." }
                }
            }
            return result
        } catch (e: Exception) {
            transactionManager.rollback(transaction)
            try {
                commandLogDao.updateExceptionStackTrace(
                    commandLogId,
                    ExceptionUtils.getStackTrace(e),
                    dateService.now()
                )
            } catch (e2: Exception) {
                logger.error(e2) { "Exception in command exception log..." }
            }
            throw e
        } finally {
            idCreationLoggerService.clean()
        }
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(command: Command) = when (command) {
        is AddInstanceCommand -> addInstanceCommandHandler
        is AddLienDeliberationCommand -> addLienDeliberationCommandHandler
        is AddRepresentantCommand -> addRepresentantCommandHandler
        is CreateDeliberationAndAddLienCommand -> createDeliberationAndAddLienCommandHandler
        is CreateOrganismeCommand -> createOrganismeCommandHandler
        is DeleteInstanceCommand -> deleteInstanceCommandHandler
        is DeleteRepresentantCommand -> deleteRepresentantCommandHandler
        is LoginCommand -> loginCommandHandler
        is MoveRepresentantCommand -> moveRepresentantCommandHandler
        is RegisterCommand -> registerCommandHandler
        is UpdateOrganismeNatureJuridiqueCommand -> updateOrganismeNatureJuridiqueCommandHandler
        is UpdateOrganismePartageRepresentantsCommand -> updateOrganismePartageRepresentantsCommandHandler
        is UpdateOrganismeSecteurCommand -> updateOrganismeSecteurCommandHandler
        is UpdateOrganismeTypeStructureCommand -> updateOrganismeTypeStructureCommandCommandHandler
    } as CommandHandler<Command, CommandResponse>

}
