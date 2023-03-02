package orgarif.controller

import java.time.Instant
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.apache.commons.lang3.exception.ExceptionUtils
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
<<<<<<< HEAD
import orgarif.command.RegisterCommandResponse
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
=======
import orgarif.domain.UserId
>>>>>>> template
import orgarif.repository.log.CommandLogDao
import orgarif.repository.user.UserDao
import orgarif.serialization.Serializer
import orgarif.service.user.UserSessionService
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.DateService
import orgarif.service.utils.TransactionIsolationService
import orgarif.service.utils.random.IdLogService
import orgarif.service.utils.random.RandomService

@RestController
class CommandController(
<<<<<<< HEAD
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
=======
    private val commandLogDao: CommandLogDao,
    private val userDao: UserDao,
    private val dateService: DateService,
    private val randomService: RandomService,
    private val idLogService: IdLogService,
    private val userSessionService: UserSessionService,
    private val devLoginCommandHandler: DevLoginCommandHandler,
    private val loginCommandHandler: LoginCommandHandler,
    private val registerCommandHandler: RegisterCommandHandler,
    private val transactionIsolationService: TransactionIsolationService,
>>>>>>> template
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
<<<<<<< HEAD
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
        }
            as CommandHandler<Command, CommandResponse>
=======
        }.let { @Suppress("UNCHECKED_CAST") (it as CommandHandler<Command, CommandResponse>) }

    // for admin commands, should return the affected user when there's one
    private fun affectedUserId(command: Command): UserId? =
        when (command) {
            is DevLoginCommand,
            is LoginCommand,
            is RegisterCommand -> null
        }
>>>>>>> template
}
