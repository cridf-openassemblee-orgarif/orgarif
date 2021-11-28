package orgarif.controller

import mu.KotlinLogging
import org.apache.commons.lang3.exception.ExceptionUtils
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import orgarif.command.*
import orgarif.domain.CommandLogId
import orgarif.repository.CommandLogDao
import orgarif.repository.UserDao
import orgarif.serialization.Serializer
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.IdLogService
import orgarif.service.RandomService
import orgarif.service.user.UserSessionService
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
    val idLogService: IdLogService,
    val userSessionService: UserSessionService,

    val addInstanceCommandHandler: AddInstanceCommandHandler,
    val addLienDeliberationCommandHandler: AddLienDeliberationCommandHandler,
    val addRepresentantCommandHandler: AddRepresentantCommandHandler,
    val createDeliberationAndAddLienCommandHandler: CreateDeliberationAndAddLienCommandHandler,
    val createOrganismeCommandHandler: CreateOrganismeCommandHandler,
    val deleteInstanceCommandHandler: DeleteInstanceCommandHandler,
    val deleteRepresentantCommandHandler: DeleteRepresentantCommandHandler,
    val deleteSecteurCommandHandler: DeleteSecteurCommandHandler,
    val deleteNatureJuridiqueCommandHandler: DeleteNatureJuridiqueCommandHandler,
    val deleteTypeStructureCommandHandler: DeleteTypeStructureCommandHandler,
    val loginCommandHandler: LoginCommandHandler,
    val moveRepresentantCommandHandler: MoveRepresentantCommandHandler,
    val registerCommandHandler: RegisterCommandHandler,
    val updateOrganismeNatureJuridiqueCommandHandler: UpdateOrganismeNatureJuridiqueCommandHandler,
    val updateOrganismePartageRepresentantsCommandHandler: UpdateOrganismePartageRepresentantsCommandHandler,
    val updateOrganismeSecteurCommandHandler: UpdateOrganismeSecteurCommandHandler,
    val updateOrganismeTypeStructureCommandCommandHandler: UpdateOrganismeTypeStructureCommandHandler,
    val updateSecteurLibelleCommandHandler: UpdateSecteurLibelleCommandHandler,
    val updateNatureJuridiqueLibelleCommandHandler: UpdateNatureJuridiqueLibelleCommandHandler,
    val updateTypeStructureLibelleCommandHandler: UpdateTypeStructureLibelleCommandHandler,
) {

    private val logger = KotlinLogging.logger {}

    // TODO[test] test these transactions & stacktrace logging !
    @PostMapping("/command")
    fun handle(
        @RequestBody jsonCommand: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): CommandResponse? {
        val command = Serializer.deserialize<Command>(jsonCommand)
        val handler = handler(command)
        val userSession = if (userSessionService.isAuthenticated()) userSessionService.getUserSession() else null
        // [doc] is filtered from sensitive data (passwords) because of serializers
        val filteredJsonCommand = Serializer.serialize(command)
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
            userSessionService.verifyRoleOrFail(
                CommandConfiguration.role(command),
                request.remoteAddr,
                command.javaClass
            )
            idLogService.enableLogging()
            val result = handler.handle(command, userSession, request, response)
            transactionManager.commit(transaction)
            try {
                commandLogDao.updateResult(
                    commandLogId,
                    idLogService.getIdsString(),
                    if (result !is EmptyCommandResponse) Serializer.serialize(result) else null,
                    dateService.now()
                )
            } catch (e: Exception) {
                logger.error(e) { "Exception in command result log..." }
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
            idLogService.clean()
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
        is DeleteTypeStructureCommand -> deleteTypeStructureCommandHandler
        is LoginCommand -> loginCommandHandler
        is MoveRepresentantCommand -> moveRepresentantCommandHandler
        is RegisterCommand -> registerCommandHandler
        is UpdateNatureJuridiqueLibelleCommand -> updateNatureJuridiqueLibelleCommandHandler
        is UpdateOrganismeNatureJuridiqueCommand -> updateOrganismeNatureJuridiqueCommandHandler
        is UpdateOrganismePartageRepresentantsCommand -> updateOrganismePartageRepresentantsCommandHandler
        is UpdateOrganismeSecteurCommand -> updateOrganismeSecteurCommandHandler
        is UpdateOrganismeTypeStructureCommand -> updateOrganismeTypeStructureCommandCommandHandler
        is UpdateSecteurLibelleCommand -> updateSecteurLibelleCommandHandler
        is UpdateTypeStructureLibelleCommand -> updateTypeStructureLibelleCommandHandler
    } as CommandHandler<Command, CommandResponse>

}
