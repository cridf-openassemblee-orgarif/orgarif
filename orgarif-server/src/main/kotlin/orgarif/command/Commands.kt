package orgarif.command

import com.fasterxml.jackson.annotation.JsonTypeInfo
import kt2ts.annotation.GenerateTypescript
import orgarif.domain.LoginResult
import orgarif.domain.PlainStringPassword
import orgarif.domain.RegisterResult
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.domain.UserInfos

@GenerateTypescript
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

@GenerateTypescript
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

data class AdminUpdateRolesCommand(val userId: UserId, val roles: Set<Role>) : Command()

data object AdminUpdateSessions : Command()

data class DevLoginCommand(val username: String) : Command()

data class DevLoginCommandResponse(val userInfos: UserInfos) : CommandResponse()

data class LoginCommand(val mail: String, val password: PlainStringPassword) : Command()

data class LoginCommandResponse(val result: LoginResult, val userInfos: UserInfos?) :
    CommandResponse()

data class UpdatePasswordCommand(val password: PlainStringPassword) : Command()

data class RegisterCommand(
    val mail: String,
    val password: PlainStringPassword,
    val displayName: String
) : Command()

data class RegisterCommandResponse(val result: RegisterResult, val userInfos: UserInfos?) :
    CommandResponse()
