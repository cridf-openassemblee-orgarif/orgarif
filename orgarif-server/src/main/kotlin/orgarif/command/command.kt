package orgarif.command

import RepresentantOrSuppleant
import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@JsonTypeInfo(use = JsonTypeInfo.Id.MINIMAL_CLASS, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

interface CommandHandler<C : Command, R : CommandResponse> {
    fun handle(command: C, userSession: UserSession?, request: HttpServletRequest, response: HttpServletResponse): R
}

abstract class LoggedOutServletCommandHandler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
    override fun handle(command: C, userSession: UserSession?, request: HttpServletRequest, response: HttpServletResponse): R {
        if (userSession != null) {
            throw RuntimeException()
        }
        return handle(command, request, response)
    }

    abstract fun handle(command: C, request: HttpServletRequest, response: HttpServletResponse): R
}

//abstract class UserSessionCommandHandler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
//    override fun doHandle(command: C, userSession: UserSession?, request: HttpServletRequest, response: HttpServletResponse): R {
//        return handle(command, userSession)
//    }
//
//    abstract fun handle(command: C, userSession: UserSession?): R
//}

abstract class LoggedOutCommandHandler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
    override fun handle(command: C, userSession: UserSession?, request: HttpServletRequest, response: HttpServletResponse): R {
        if (userSession != null) {
            throw RuntimeException()
        }
        return handle(command)
    }

    abstract fun handle(command: C): R
}

abstract class LoggedInCommandHandler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
    override fun handle(command: C, userSession: UserSession?, request: HttpServletRequest, response: HttpServletResponse): R {
        if (userSession == null) {
            throw RuntimeException()
        }
        return handle(command, userSession)
    }

    abstract fun handle(command: C, userSession: UserSession): R
}

abstract class NeutralCommandHandler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
    override fun handle(command: C, userSession: UserSession?, request: HttpServletRequest, response: HttpServletResponse): R {
        return handle(command)
    }

    abstract fun handle(command: C): R
}

data class CreateOrganismeCommand(val nom: String) : Command()

data class CreateOrganismeCommandResponse(val id: OrganismeId) : CommandResponse()

// [doc] login as username|mail
data class LoginCommand(val login: String,
                        val password: PlainStringPassword) : Command()

data class LoginCommandResponse(val result: LoginResult,
                                val userinfos: UserInfos?,
                                val csrfToken: String?) : CommandResponse()

data class MoveRepresentantCommand(val id: RepresentantId,
                                   val toOrganismeId: OrganismeId,
                                   val toInstanceId: InstanceId?,
                                   val toPosition: Int,
                                   val toRepresentantOrSuppleant: RepresentantOrSuppleant) : Command()

data class RegisterCommand(val mail: String,
                           val password: PlainStringPassword,
                           val displayName: String) : Command()

data class RegisterCommandResponse(val result: RegisterResult,
                                   val userinfos: UserInfos?) : CommandResponse()

data class UpdateOrganismeNatureJuridiqueCommand(val id: OrganismeId,
                                                 val natureJuridiqueId: NatureJuridiqueId) : Command()

data class UpdateOrganismeSecteurCommand(val id: OrganismeId,
                                         val secteurId: SecteurId) : Command()

data class UpdateOrganismeTypeStructureCommand(val id: OrganismeId,
                                               val typeStructureId: TypeStructureId) : Command()