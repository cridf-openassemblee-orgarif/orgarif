package orgarif.command

import com.fasterxml.jackson.annotation.JsonTypeInfo
import java.time.LocalDate
import orgarif.domain.*

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

data class AddInstanceCommand(
    val nomInstance: String,
    val organismeId: OrganismeId,
) : Command()

data class AddInstanceCommandResponse(val id: InstanceId) : CommandResponse()

data class AddLienDeliberationCommand(
    val deliberationId: DeliberationId,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?
) : Command()

data class AddLienDeliberationCommandResponse(val lienDeliberationId: LienDeliberationId) :
    CommandResponse()

data class AddRepresentationCommand(
    val representantId: RepresentantId,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?
) : Command()

data class AddRepresentationCommandResponse(val id: RepresentationId) : CommandResponse()

data class CreateDeliberationAndAddLienCommand(
    val libelle: String,
    val deliberationDate: LocalDate,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?
) : Command()

data class CreateDeliberationAndAddLienCommandResponse(
    val deliberationId: DeliberationId,
    val lienDeliberationId: LienDeliberationId
) : CommandResponse()

data class CreateNatureJuridiqueCommand(val libelle: String) : Command()

data class CreateNatureJuridiqueCommandResponse(val id: NatureJuridiqueId) : CommandResponse()

data class CreateOrganismeCommand(val nom: String) : Command()

data class CreateOrganismeCommandResponse(val id: OrganismeId) : CommandResponse()

data class CreateSecteurCommand(val libelle: String) : Command()

data class CreateSecteurCommandResponse(val id: SecteurId) : CommandResponse()

data class CreateTypeStructureCommand(val libelle: String) : Command()

data class CreateTypeStructureCommandResponse(val id: TypeStructureId) : CommandResponse()

// [doc] login as username|mail
data class LoginCommand(val login: String, val password: PlainStringPassword) : Command()

data class LoginCommandResponse(
    val result: LoginResult,
    val userinfos: UserInfos?,
    val csrfToken: String?
) : CommandResponse()

data class MoveRepresentationCommand(
    val id: RepresentationId,
    val toOrganismeId: OrganismeId,
    val toInstanceId: InstanceId?,
    val toPosition: Int
) : Command()

data class RegisterCommand(
    val mail: String,
    val password: PlainStringPassword,
    val displayName: String
) : Command()

data class RegisterCommandResponse(val result: RegisterResult, val userinfos: UserInfos?) :
    CommandResponse()

data class UpdateInstanceNombreRepresentantsCommand(val instanceId: InstanceId, val nombre: Int?) :
    Command()

data class UpdateInstanceNombreSuppleantsCommand(val instanceId: InstanceId, val nombre: Int?) :
    Command()

data class UpdateInstanceNomCommand(val id: InstanceId, val nom: String) : Command()

data class UpdateInstanceStatusCommand(val id: InstanceId, val status: ItemStatus) : Command()

data class UpdateNatureJuridiqueLibelleCommand(val id: NatureJuridiqueId, val libelle: String) :
    Command()

data class UpdateNatureJuridiqueStatusCommand(val id: NatureJuridiqueId, val status: ItemStatus) :
    Command()

data class UpdateOrganismeNatureJuridiqueCommand(
    val id: OrganismeId,
    val natureJuridiqueId: NatureJuridiqueId?
) : Command()

data class UpdateOrganismeNombreRepresentantsCommand(val id: OrganismeId, val nombre: Int?) :
    Command()

data class UpdateOrganismeNombreSuppleantsCommand(val id: OrganismeId, val nombre: Int?) :
    Command()

data class UpdateOrganismeNomCommand(val id: OrganismeId, val nom: String) : Command()

data class UpdateOrganismeSecteurCommand(val id: OrganismeId, val secteurId: SecteurId?) :
    Command()

data class UpdateOrganismeTypeStructureCommand(
    val id: OrganismeId,
    val typeStructureId: TypeStructureId?
) : Command()

data class UpdateRepresentationStatusCommand(val id: RepresentationId, val status: ItemStatus) :
    Command()

data class UpdateSecteurLibelleCommand(val id: SecteurId, val libelle: String) : Command()

data class UpdateSecteurStatusCommand(val id: SecteurId, val status: ItemStatus) : Command()

data class UpdateTypeStructureLibelleCommand(val id: TypeStructureId, val libelle: String) :
    Command()

data class UpdateTypeStructureStatusCommand(val id: TypeStructureId, val status: ItemStatus) :
    Command()
