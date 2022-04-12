package orgarif.command

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.stereotype.Service
import orgarif.domain.RegisterResult
import orgarif.domain.UserInfos
import orgarif.domain.UserSession
import orgarif.error.MailAlreadyRegisteredException
import orgarif.service.LocaleService
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionService

@Service
class RegisterCommandHandler(
    val userService: UserService,
    val userSessionService: UserSessionService,
    val localeService: LocaleService
) : CommandHandler<RegisterCommand, RegisterCommandResponse> {

    companion object {
        // TODO[fmk] those validations should be done in another place too. Also :
        // * should not be longer than 255 chars (because of the database)
        fun validateRegisterCommand(c: RegisterCommand) {
            // TODO use require
            if (c.mail.isBlank()) throw IllegalArgumentException("Mail is blank")
            if (c.password.password.isBlank()) throw IllegalArgumentException("Password is blank")
            if (c.displayName.isBlank()) throw IllegalArgumentException("Display name is blank")
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
        validateRegisterCommand(command)
        val user =
            try {
                userService.createUser(
                    command.mail.trim(),
                    userService.hashPassword(command.password),
                    command.displayName,
                    localeService.selectLanguage(request.locales))
            } catch (e: MailAlreadyRegisteredException) {
                return RegisterCommandResponse(RegisterResult.mailAlreadyExists, null)
            }
        userSessionService.authenticateUser(user, request, response)
        return RegisterCommandResponse(RegisterResult.registered, UserInfos.fromUser(user))
    }
}
