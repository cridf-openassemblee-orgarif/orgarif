package orgarif.command

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import orgarif.domain.HashedPassword
import orgarif.domain.RegisterResult
import orgarif.domain.UserInfos
import orgarif.domain.UserSession
import orgarif.error.MailAlreadyRegisteredException
import orgarif.service.user.UserService

@Service
class RegisterCommandHandler(val userService: UserService, val passwordEncoder: PasswordEncoder) :
    CommandHandler<RegisterCommand, RegisterCommandResponse> {

    companion object {
        fun validatePassword(password: String) {
            if (password.isBlank()) throw IllegalArgumentException("Password is blank")
        }
    }

    override fun handle(
        command: RegisterCommand,
        userSession: UserSession?,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): RegisterCommandResponse {
        if (userSession != null) {
            // FIXME can't find the wooord
            // OrgarifCommonException
            // OrgarifStandardException
            throw RuntimeException("$userSession")
        }
        UserService.validateRegisterUserDto(command)
        validatePassword(command.password.password)
        val hashedPassword = HashedPassword(passwordEncoder.encode(command.password.password))
        val registerAndAuthenticateResult =
            try {
                userService.createAndAuthenticateUser(command, hashedPassword, request, response)
            } catch (e: MailAlreadyRegisteredException) {
                return RegisterCommandResponse(RegisterResult.mailAlreadyExists, null)
            }
        return RegisterCommandResponse(
            RegisterResult.registered, UserInfos.fromUser(registerAndAuthenticateResult.user))
    }
}
