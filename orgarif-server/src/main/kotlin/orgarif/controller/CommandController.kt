package orgarif.controller

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.apache.commons.lang3.exception.ExceptionUtils
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import orgarif.command.AddDesignationCommand
import orgarif.command.AddDesignationCommandHandler
import orgarif.command.AddInstanceCommand
import orgarif.command.AddInstanceCommandHandler
import orgarif.command.AddLienDeliberationCommand
import orgarif.command.AddLienDeliberationCommandHandler
import orgarif.command.Command
import orgarif.command.CommandConfiguration
import orgarif.command.CommandHandler
import orgarif.command.CommandResponse
import orgarif.command.CreateDeliberationCommand
import orgarif.command.CreateDeliberationCommandHandler
import orgarif.command.CreateDepartementCommand
import orgarif.command.CreateDepartementCommandHandler
import orgarif.command.CreateNatureJuridiqueCommand
import orgarif.command.CreateNatureJuridiqueCommandHandler
import orgarif.command.CreateOrganismeCommand
import orgarif.command.CreateOrganismeCommandHandler
import orgarif.command.CreateRepresentantCommand
import orgarif.command.CreateRepresentantCommandHandler
import orgarif.command.CreateSecteurCommand
import orgarif.command.CreateSecteurCommandHandler
import orgarif.command.CreateTypeStructureCommand
import orgarif.command.CreateTypeStructureCommandHandler
import orgarif.command.DevLoginCommand
import orgarif.command.DevLoginCommandHandler
import orgarif.command.EmptyCommandResponse
import orgarif.command.LoginCommand
import orgarif.command.LoginCommandHandler
import orgarif.command.RegisterCommand
import orgarif.command.RegisterCommandHandler
import orgarif.command.UpdateDepartementCommand
import orgarif.command.UpdateDepartementCommandHandler
import orgarif.command.UpdateDepartementStatusCommand
import orgarif.command.UpdateDepartementStatusCommandHandler
import orgarif.command.UpdateDesignationDatesCommand
import orgarif.command.UpdateDesignationDatesCommandHandler
import orgarif.command.UpdateDesignationStatusCommand
import orgarif.command.UpdateDesignationStatusCommandHandler
import orgarif.command.UpdateInstanceNomCommand
import orgarif.command.UpdateInstanceNomCommandHandler
import orgarif.command.UpdateInstanceNombreRepresentantsCommand
import orgarif.command.UpdateInstanceNombreRepresentantsCommandHandler
import orgarif.command.UpdateInstancePresenceSuppleantsCommand
import orgarif.command.UpdateInstancePresenceSuppleantsCommandHandler
import orgarif.command.UpdateInstanceStatusCommand
import orgarif.command.UpdateInstanceStatusCommandHandler
import orgarif.command.UpdateLienDeliberationCommentCommand
import orgarif.command.UpdateLienDeliberationCommentCommandHandler
import orgarif.command.UpdateLienDeliberationStatusCommand
import orgarif.command.UpdateLienDeliberationStatusCommandHandler
import orgarif.command.UpdateNatureJuridiqueLibelleCommand
import orgarif.command.UpdateNatureJuridiqueLibelleCommandHandler
import orgarif.command.UpdateNatureJuridiqueStatusCommand
import orgarif.command.UpdateNatureJuridiqueStatusCommandHandler
import orgarif.command.UpdateOrganismeDepartementCommand
import orgarif.command.UpdateOrganismeDepartementCommandHandler
import orgarif.command.UpdateOrganismeNatureJuridiqueCommand
import orgarif.command.UpdateOrganismeNatureJuridiqueCommandHandler
import orgarif.command.UpdateOrganismeNomCommand
import orgarif.command.UpdateOrganismeNomCommandHandler
import orgarif.command.UpdateOrganismeNombreRepresentantsCommand
import orgarif.command.UpdateOrganismeNombreRepresentantsCommandHandler
import orgarif.command.UpdateOrganismePresenceSuppleantsCommand
import orgarif.command.UpdateOrganismePresenceSuppleantsCommandHandler
import orgarif.command.UpdateOrganismeSecteurCommand
import orgarif.command.UpdateOrganismeSecteurCommandHandler
import orgarif.command.UpdateOrganismeStatusCommand
import orgarif.command.UpdateOrganismeStatusCommandHandler
import orgarif.command.UpdateOrganismeTypeStructureCommand
import orgarif.command.UpdateOrganismeTypeStructureCommandHandler
import orgarif.command.UpdateSecteurLibelleCommand
import orgarif.command.UpdateSecteurLibelleCommandHandler
import orgarif.command.UpdateSecteurStatusCommand
import orgarif.command.UpdateSecteurStatusCommandHandler
import orgarif.command.UpdateTypeStructureLibelleCommand
import orgarif.command.UpdateTypeStructureLibelleCommandHandler
import orgarif.command.UpdateTypeStructureStatusCommand
import orgarif.command.UpdateTypeStructureStatusCommandHandler
import orgarif.domain.CommandLogId
import orgarif.repository.log.CommandLogDao
import orgarif.repository.user.UserDao
import orgarif.serialization.Serializer
import orgarif.service.ApplicationInstance
import orgarif.service.DateService
import orgarif.service.IdLogService
import orgarif.service.RandomService
import orgarif.service.user.UserSessionService

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
    val addDesignationCommandHandler: AddDesignationCommandHandler,
    val addInstanceCommandHandler: AddInstanceCommandHandler,
    val addLienDeliberationCommandHandler: AddLienDeliberationCommandHandler,
    val createDeliberationCommandHandler: CreateDeliberationCommandHandler,
    val createDepartementCommandHandler: CreateDepartementCommandHandler,
    val createNatureJuridiqueCommandHandler: CreateNatureJuridiqueCommandHandler,
    val createOrganismeCommandHandler: CreateOrganismeCommandHandler,
    val createRepresentantCommandHandler: CreateRepresentantCommandHandler,
    val createSecteurCommandHandler: CreateSecteurCommandHandler,
    val createTypeStructureCommandHandler: CreateTypeStructureCommandHandler,
    val devLoginCommandHandler: DevLoginCommandHandler,
    val loginCommandHandler: LoginCommandHandler,
    val registerCommandHandler: RegisterCommandHandler,
    val updateDepartementCommandHandler: UpdateDepartementCommandHandler,
    val updateDepartementStatusCommandHandler: UpdateDepartementStatusCommandHandler,
    val updateDesignationDatesCommandHandler: UpdateDesignationDatesCommandHandler,
    val updateDesignationStatusCommandHandler: UpdateDesignationStatusCommandHandler,
    val updateInstanceNombreRepresentantsCommandHandler:
        UpdateInstanceNombreRepresentantsCommandHandler,
    val updateInstanceNomCommandHandler: UpdateInstanceNomCommandHandler,
    val updateInstancePresenceSuppleantsCommandHandler:
        UpdateInstancePresenceSuppleantsCommandHandler,
    val updateInstanceStatusCommandHandler: UpdateInstanceStatusCommandHandler,
    val updateLienDeliberationCommentCommandHandler: UpdateLienDeliberationCommentCommandHandler,
    val updateLienDeliberationStatusCommandHandler: UpdateLienDeliberationStatusCommandHandler,
    val updateNatureJuridiqueLibelleCommandHandler: UpdateNatureJuridiqueLibelleCommandHandler,
    val updateNatureJuridiqueStatusCommandHandler: UpdateNatureJuridiqueStatusCommandHandler,
    val updateOrganismeDepartementCommandHandler: UpdateOrganismeDepartementCommandHandler,
    val updateOrganismeNatureJuridiqueCommandHandler: UpdateOrganismeNatureJuridiqueCommandHandler,
    val updateOrganismeNomCommandHandler: UpdateOrganismeNomCommandHandler,
    val updateOrganismeNombreRepresentantsCommandHandler:
        UpdateOrganismeNombreRepresentantsCommandHandler,
    val updateOrganismePresenceSuppleantsCommandHandler:
        UpdateOrganismePresenceSuppleantsCommandHandler,
    val updateOrganismeSecteurCommandHandler: UpdateOrganismeSecteurCommandHandler,
    val updateOrganismeStatusCommandHandler: UpdateOrganismeStatusCommandHandler,
    val updateOrganismeTypeStructureCommandCommandHandler:
        UpdateOrganismeTypeStructureCommandHandler,
    val updateSecteurLibelleCommandHandler: UpdateSecteurLibelleCommandHandler,
    val updateSecteurStatusCommandHandler: UpdateSecteurStatusCommandHandler,
    val updateTypeStructureLibelleCommandHandler: UpdateTypeStructureLibelleCommandHandler,
    val updateTypeStructureStatusCommandHandler: UpdateTypeStructureStatusCommandHandler,
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
        val userSession =
            if (userSessionService.isAuthenticated()) userSessionService.getUserSession() else null
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
                endDate = null))
        val transaction = transactionManager.getTransaction(null)

        try {
            userSessionService.verifyRoleOrFail(
                CommandConfiguration.role(command), request.remoteAddr, command.javaClass)
            idLogService.enableLogging()
            val result = handler.handle(command, userSession, request, response)
            transactionManager.commit(transaction)
            try {
                commandLogDao.updateResult(
                    commandLogId,
                    idLogService.getIdsString(),
                    if (result !is EmptyCommandResponse) Serializer.serialize(result) else null,
                    dateService.now())
            } catch (e: Exception) {
                logger.error(e) { "Exception in command result log..." }
            }
            return result
        } catch (e: Exception) {
            transactionManager.rollback(transaction)
            try {
                commandLogDao.updateExceptionStackTrace(
                    commandLogId, ExceptionUtils.getStackTrace(e), dateService.now())
            } catch (e2: Exception) {
                logger.error(e2) { "Exception in command exception log..." }
            }
            throw e
        } finally {
            idLogService.clean()
        }
    }

    @Suppress("UNCHECKED_CAST")
    private fun handler(command: Command) =
        when (command) {
            is AddDesignationCommand -> addDesignationCommandHandler
            is AddInstanceCommand -> addInstanceCommandHandler
            is AddLienDeliberationCommand -> addLienDeliberationCommandHandler
            is CreateDeliberationCommand -> createDeliberationCommandHandler
            is CreateDepartementCommand -> createDepartementCommandHandler
            is CreateNatureJuridiqueCommand -> createNatureJuridiqueCommandHandler
            is CreateOrganismeCommand -> createOrganismeCommandHandler
            is CreateRepresentantCommand -> createRepresentantCommandHandler
            is CreateSecteurCommand -> createSecteurCommandHandler
            is CreateTypeStructureCommand -> createTypeStructureCommandHandler
            is DevLoginCommand -> devLoginCommandHandler
            is LoginCommand -> loginCommandHandler
            is RegisterCommand -> registerCommandHandler
            is UpdateDepartementCommand -> updateDepartementCommandHandler
            is UpdateDepartementStatusCommand -> updateDepartementStatusCommandHandler
            is UpdateDesignationDatesCommand -> updateDesignationDatesCommandHandler
            is UpdateDesignationStatusCommand -> updateDesignationStatusCommandHandler
            is UpdateInstanceNombreRepresentantsCommand ->
                updateInstanceNombreRepresentantsCommandHandler
            is UpdateInstanceNomCommand -> updateInstanceNomCommandHandler
            is UpdateInstancePresenceSuppleantsCommand ->
                updateInstancePresenceSuppleantsCommandHandler
            is UpdateInstanceStatusCommand -> updateInstanceStatusCommandHandler
            is UpdateLienDeliberationCommentCommand -> updateLienDeliberationCommentCommandHandler
            is UpdateLienDeliberationStatusCommand -> updateLienDeliberationStatusCommandHandler
            is UpdateNatureJuridiqueLibelleCommand -> updateNatureJuridiqueLibelleCommandHandler
            is UpdateNatureJuridiqueStatusCommand -> updateNatureJuridiqueStatusCommandHandler
            is UpdateOrganismeDepartementCommand -> updateOrganismeDepartementCommandHandler
            is UpdateOrganismeNatureJuridiqueCommand -> updateOrganismeNatureJuridiqueCommandHandler
            is UpdateOrganismeNombreRepresentantsCommand ->
                updateOrganismeNombreRepresentantsCommandHandler
            is UpdateOrganismeNomCommand -> updateOrganismeNomCommandHandler
            is UpdateOrganismePresenceSuppleantsCommand ->
                updateOrganismePresenceSuppleantsCommandHandler
            is UpdateOrganismeSecteurCommand -> updateOrganismeSecteurCommandHandler
            is UpdateOrganismeStatusCommand -> updateOrganismeStatusCommandHandler
            is UpdateOrganismeTypeStructureCommand ->
                updateOrganismeTypeStructureCommandCommandHandler
            is UpdateSecteurLibelleCommand -> updateSecteurLibelleCommandHandler
            is UpdateSecteurStatusCommand -> updateSecteurStatusCommandHandler
            is UpdateTypeStructureLibelleCommand -> updateTypeStructureLibelleCommandHandler
            is UpdateTypeStructureStatusCommand -> updateTypeStructureStatusCommandHandler
        } as
            CommandHandler<Command, CommandResponse>
}
