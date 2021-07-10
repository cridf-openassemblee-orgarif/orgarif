package orgarif.command

import com.fasterxml.jackson.annotation.JsonTypeInfo
import orgarif.domain.*
import java.time.LocalDate

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

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

data class RegisterCommand(
    val mail: String,
    val password: PlainStringPassword,
    val displayName: String
) : Command()

data class RegisterCommandResponse(
    val result: RegisterResult,
    val userinfos: UserInfos?
) : CommandResponse()
