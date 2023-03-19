package orgarif.command

import com.fasterxml.jackson.annotation.JsonTypeInfo
import kttots.Shared
import orgarif.domain.LoginResult
import orgarif.domain.PlainStringPassword
import orgarif.domain.RegisterResult
import orgarif.domain.Role
import orgarif.domain.UserId
import orgarif.domain.UserInfos

@Shared
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Command

@Shared sealed class CommandResponse

object EmptyCommandResponse : CommandResponse()

data class AdminUpdateRolesCommand(val userId: UserId, val roles: Set<Role>) : Command()

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
