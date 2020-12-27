package orgarif.command

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import orgarif.domain.HashedPassword
import orgarif.domain.RegisterResult
import orgarif.domain.UserInfos
import orgarif.error.MailAlreadyRegisteredException
import orgarif.service.user.UserService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class RegisterCommandHandler(val userService: UserService,
                             val passwordEncoder: PasswordEncoder) :
        LoggedOutServletCommandHandler<RegisterCommand, RegisterCommandResponse>() {

    companion object {
        fun validatePassword(password: String) {
            if (password.isBlank()) throw IllegalArgumentException("Password is blank")
        }
    }

    override fun handle(command: RegisterCommand, request: HttpServletRequest, response: HttpServletResponse):
            RegisterCommandResponse {
        UserService.validateRegisterUserDto(command)
        validatePassword(command.password.password)
        val hashedPassword = HashedPassword(passwordEncoder.encode(command.password.password))
        val registerAndAuthenticateResult = try {
            userService.createAndAuthenticateUser(command, hashedPassword, request, response)
        } catch (e: MailAlreadyRegisteredException) {
            return RegisterCommandResponse(RegisterResult.MAIL_ALREADY_EXISTS, null)
        }
        return RegisterCommandResponse(RegisterResult.REGISTERED,
                UserInfos.fromUser(registerAndAuthenticateResult.user))
    }

}
