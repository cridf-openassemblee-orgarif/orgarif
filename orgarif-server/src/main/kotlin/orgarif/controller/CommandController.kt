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
    val deleteSecteurCommandHandler: DeleteSecteurCommandHandler,
    val deleteNatureJuridiqueCommandHandler: DeleteNatureJuridiqueCommandHandler,
    val loginCommandHandler: LoginCommandHandler,
    val moveRepresentantCommandHandler: MoveRepresentantCommandHandler,
    val registerCommandHandler: RegisterCommandHandler,
    val updateOrganismeNatureJuridiqueCommandHandler: UpdateOrganismeNatureJuridiqueCommandHandler,
    val updateOrganismePartageRepresentantsCommandHandler: UpdateOrganismePartageRepresentantsCommandHandler,
    val updateOrganismeSecteurCommandHandler: UpdateOrganismeSecteurCommandHandler,
    val updateOrganismeTypeStructureCommandCommandHandler: UpdateOrganismeTypeStructureCommandHandler,
    val updateSecteurLibelleCommandHandler: UpdateSecteurLibelleCommandHandler,
    val updateNatureJuridiqueLibelleCommandHandler: UpdateNatureJuridiqueLibelleCommandHandler,
) {

    private val logger = KotlinLogging.logger {}

    // TODO[test] test these transactions & stacktrace logging !
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
        // TODO[test] make an only insert at the end, with no update ?
        // or make an insert first to protect from some errors (? isolate its transactionl)
        val commandLogId = randomService.id<CommandLogId>()
        commandLogDao.insert(
            CommandLogDao.Record(
                id = commandLogId,
                userId = userSession?.userId,
                deploymentLogId = applicationInstance.deploymentId,
                commandClass = command.javaClass,
                jsonCommand = filteredJsonCommand,
                // the ip can evolve within a session, it makes sense to save it here
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
                AuthenticationLevel.anonymous,
                AuthenticationLevel.loggedIn -> {
                    handler.handle(command, userSession, request, response)
                }
                AuthenticationLevel.admin -> {
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
        is DeleteNatureJuridiqueCommand -> deleteNatureJuridiqueCommandHandler
        is DeleteRepresentantCommand -> deleteRepresentantCommandHandler
        is DeleteSecteurCommand -> deleteSecteurCommandHandler
        is LoginCommand -> loginCommandHandler
        is MoveRepresentantCommand -> moveRepresentantCommandHandler
        is RegisterCommand -> registerCommandHandler
        is UpdateNatureJuridiqueLibelleCommand -> updateNatureJuridiqueLibelleCommandHandler
        is UpdateOrganismeNatureJuridiqueCommand -> updateOrganismeNatureJuridiqueCommandHandler
        is UpdateOrganismePartageRepresentantsCommand -> updateOrganismePartageRepresentantsCommandHandler
        is UpdateOrganismeSecteurCommand -> updateOrganismeSecteurCommandHandler
        is UpdateOrganismeTypeStructureCommand -> updateOrganismeTypeStructureCommandCommandHandler
        is UpdateSecteurLibelleCommand -> updateSecteurLibelleCommandHandler
    } as CommandHandler<Command, CommandResponse>

}
