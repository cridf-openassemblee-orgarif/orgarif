package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.UserSession
import orgarif.service.user.UserService

@Service
class UpdatePasswordCommandHandler(private val userService: UserService) :
    CommandHandler.SessionHandler<UpdatePasswordCommand, EmptyCommandResponse>() {

    override fun handle(
        command: UpdatePasswordCommand,
        userSession: UserSession
    ): EmptyCommandResponse {
        userService.updatePassword(userSession.userId, command.password)
        return EmptyCommandResponse
    }
}
