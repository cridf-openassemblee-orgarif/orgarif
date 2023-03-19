package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.UserSession
import orgarif.service.user.UserService

@Service
class AdminUpdatePasswordCommandHandler(private val userService: UserService) :
    CommandHandler.SessionHandler<AdminUpdatePasswordCommand, EmptyCommandResponse>() {

    override fun handle(
        command: AdminUpdatePasswordCommand,
        userSession: UserSession
    ): EmptyCommandResponse {
        userService.updatePassword(command.userId, command.password)
        return EmptyCommandResponse
    }
}
