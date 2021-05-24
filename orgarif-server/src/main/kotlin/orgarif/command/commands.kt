package orgarif.command

import RepresentantOrSuppleant
import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.*
import java.time.LocalDate

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

data class AddInstanceCommand(
    val nomInstance: String,
    val organismeId: OrganismeId
) : Command()

data class AddInstanceCommandResponse(val id: InstanceId) : CommandResponse()

data class AddLienDeliberationCommand(
    val deliberationId: DeliberationId,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?
) : Command()

data class AddLienDeliberationCommandResponse(val lienDeliberationId: LienDeliberationId) : CommandResponse()

data class AddRepresentantCommand(
    val eluId: EluId,
    val organismeId: OrganismeId,
    val instanceId: InstanceId?,
    val representantOrSuppleant: RepresentantOrSuppleant
) : Command()

data class AddRepresentantCommandResponse(val id: RepresentantId) : CommandResponse()

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

data class CreateOrganismeCommand(val nom: String) : Command()

data class CreateOrganismeCommandResponse(val id: OrganismeId) : CommandResponse()

data class DeleteInstanceCommand(val id: InstanceId) : Command()

data class DeleteRepresentantCommand(val id: RepresentantId) : Command()

// [doc] login as username|mail
data class LoginCommand(
    val login: String,
    val password: PlainStringPassword
) : Command()

data class LoginCommandResponse(
    val result: LoginResult,
    val userinfos: UserInfos?,
    val csrfToken: String?
) : CommandResponse()

data class MoveRepresentantCommand(
    val id: RepresentantId,
    val toOrganismeId: OrganismeId,
    val toInstanceId: InstanceId?,
    val toPosition: Int,
    val toRepresentantOrSuppleant: RepresentantOrSuppleant
) : Command()

data class RegisterCommand(
    val mail: String,
    val password: PlainStringPassword
) : Command()

data class RegisterCommandResponse(
    val result: RegisterResult,
    val userinfos: UserInfos?
) : CommandResponse()

data class UpdateOrganismeNatureJuridiqueCommand(
    val id: OrganismeId,
    val natureJuridiqueId: NatureJuridiqueId?
) : Command()

data class UpdateOrganismePartageRepresentantsCommand(
    val id: OrganismeId,
    val partageRepresentants: Boolean
) : Command()

data class UpdateOrganismeSecteurCommand(
    val id: OrganismeId,
    val secteurId: SecteurId?
) : Command()

data class UpdateOrganismeTypeStructureCommand(
    val id: OrganismeId,
    val typeStructureId: TypeStructureId?
) : Command()