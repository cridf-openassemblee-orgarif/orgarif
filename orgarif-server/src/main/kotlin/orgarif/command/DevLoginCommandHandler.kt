package orgarif.command

import orgarif.domain.PlainStringPassword
import orgarif.domain.UserSession
import orgarif.service.DevInitialDataInjectorService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.stereotype.Service

@Service
class DevLoginCommandHandler(
    private val devInitialDataInjectorService: DevInitialDataInjectorService,
    private val loginCommandHandler: LoginCommandHandler,
) : CommandHandler<DevLoginCommand, DevLoginCommandResponse> {

    override fun handle(
        command: DevLoginCommand,
        userSession: UserSession?,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): DevLoginCommandResponse {
        val mail = devInitialDataInjectorService.devUserMail(command.username)
        return loginCommandHandler
            .handle(
                LoginCommand(mail, PlainStringPassword(command.username)),
                userSession,
                request,
                response)
            .let {
                DevLoginCommandResponse(
                    it.userinfos ?: throw IllegalArgumentException(command.username))
            }
    }
}
