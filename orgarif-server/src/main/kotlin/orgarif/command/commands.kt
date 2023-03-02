package orgarif.command

import com.fasterxml.jackson.annotation.JsonTypeInfo
<<<<<<< HEAD
import java.time.LocalDate
import orgarif.domain.DeliberationId
import orgarif.domain.DepartementId
import orgarif.domain.DesignationId
import orgarif.domain.DesignationType
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus
import orgarif.domain.LienDeliberationId
=======
import kttots.Shared
>>>>>>> template
import orgarif.domain.LoginResult
import orgarif.domain.NatureJuridiqueId
import orgarif.domain.OrganismeId
import orgarif.domain.PlainStringPassword
import orgarif.domain.RegisterResult
import orgarif.domain.RepresentantId
import orgarif.domain.SecteurId
import orgarif.domain.TypeStructureId
import orgarif.domain.UserInfos

@Shared
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

@Shared sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

data class AddDesignationCommand(
    val representantId: RepresentantId,
    val type: DesignationType,
    val position: Int,
    val startDate: LocalDate?,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?
) : Command()

// TODO wtf retour juste DesignationId
data class AddDesignationCommandResponse(val id: DesignationId) : CommandResponse()

data class AddInstanceCommand(
    val nomInstance: String,
    val organismeId: OrganismeId,
) : Command()

data class AddInstanceCommandResponse(val id: InstanceId) : CommandResponse()

data class AddLienDeliberationCommand(
    val deliberationId: DeliberationId,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?,
    val comment: String?
) : Command()

data class AddLienDeliberationCommandResponse(val lienDeliberationId: LienDeliberationId) :
    CommandResponse()

data class CreateDeliberationCommand(val libelle: String, val deliberationDate: LocalDate) :
    Command()

data class CreateDeliberationCommandResponse(val deliberationId: DeliberationId) :
    CommandResponse()

data class CreateDepartementCommand(val libelle: String, val code: String) : Command()

data class CreateDepartementCommandResponse(val id: DepartementId) : CommandResponse()

data class CreateNatureJuridiqueCommand(val libelle: String) : Command()

data class CreateNatureJuridiqueCommandResponse(val id: NatureJuridiqueId) : CommandResponse()

data class CreateOrganismeCommand(val nom: String) : Command()

data class CreateOrganismeCommandResponse(val id: OrganismeId) : CommandResponse()

data class CreateRepresentantCommand(val prenom: String, val nom: String) : Command()

data class CreateRepresentantCommandResponse(val representantId: RepresentantId) :
    CommandResponse()

data class CreateSecteurCommand(val libelle: String) : Command()

data class CreateSecteurCommandResponse(val id: SecteurId) : CommandResponse()

data class CreateTypeStructureCommand(val libelle: String) : Command()

data class CreateTypeStructureCommandResponse(val id: TypeStructureId) : CommandResponse()

data class DevLoginCommand(val username: String) : Command()

data class DevLoginCommandResponse(val userinfos: UserInfos) : CommandResponse()

data class LoginCommand(val mail: String, val password: PlainStringPassword) : Command()

data class LoginCommandResponse(val result: LoginResult, val userinfos: UserInfos?) :
    CommandResponse()

data class RegisterCommand(
    val mail: String,
    val password: PlainStringPassword,
    val displayName: String
) : Command()

data class RegisterCommandResponse(val result: RegisterResult, val userinfos: UserInfos?) :
    CommandResponse()

data class UpdateDepartementCommand(val id: DepartementId, val libelle: String, val code: String) :
    Command()

data class UpdateDepartementStatusCommand(val id: DepartementId, val status: ItemStatus) :
    Command()

data class UpdateDesignationDatesCommand(
    val designationId: DesignationId,
    val startDate: LocalDate?,
    val endDate: LocalDate?,
) : Command()

data class UpdateDesignationStatusCommand(val id: DesignationId, val status: ItemStatus) :
    Command()

data class UpdateInstanceNombreRepresentantsCommand(val instanceId: InstanceId, val nombre: Int) :
    Command()

data class UpdateInstanceNomCommand(val id: InstanceId, val nom: String) : Command()

data class UpdateInstancePresenceSuppleantsCommand(
    val presenceSuppleants: Boolean,
    val instanceId: InstanceId
) : Command()

data class UpdateInstanceStatusCommand(val id: InstanceId, val status: ItemStatus) : Command()

data class UpdateLienDeliberationCommentCommand(val id: LienDeliberationId, val comment: String?) :
    Command()

data class UpdateLienDeliberationStatusCommand(val id: LienDeliberationId, val status: ItemStatus) :
    Command()

data class UpdateNatureJuridiqueLibelleCommand(val id: NatureJuridiqueId, val libelle: String) :
    Command()

data class UpdateNatureJuridiqueStatusCommand(val id: NatureJuridiqueId, val status: ItemStatus) :
    Command()

data class UpdateOrganismeDepartementCommand(
    val id: OrganismeId,
    val departementId: DepartementId?
) : Command()

data class UpdateOrganismeNatureJuridiqueCommand(
    val id: OrganismeId,
    val natureJuridiqueId: NatureJuridiqueId?
) : Command()

data class UpdateOrganismeNombreRepresentantsCommand(val id: OrganismeId, val nombre: Int) :
    Command()

data class UpdateOrganismeNomCommand(val id: OrganismeId, val nom: String) : Command()

data class UpdateOrganismePresenceSuppleantsCommand(
    val presenceSuppleants: Boolean,
    val organismeId: OrganismeId
) : Command()

data class UpdateOrganismeSecteurCommand(val id: OrganismeId, val secteurId: SecteurId?) :
    Command()

data class UpdateOrganismeStatusCommand(val id: OrganismeId, val status: ItemStatus) : Command()

data class UpdateOrganismeTypeStructureCommand(
    val id: OrganismeId,
    val typeStructureId: TypeStructureId?
) : Command()

data class UpdateSecteurLibelleCommand(val id: SecteurId, val libelle: String) : Command()

data class UpdateSecteurStatusCommand(val id: SecteurId, val status: ItemStatus) : Command()

data class UpdateTypeStructureLibelleCommand(val id: TypeStructureId, val libelle: String) :
    Command()

data class UpdateTypeStructureStatusCommand(val id: TypeStructureId, val status: ItemStatus) :
    Command()
