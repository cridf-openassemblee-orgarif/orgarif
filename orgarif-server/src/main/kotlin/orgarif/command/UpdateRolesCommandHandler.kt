package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.UserSession
import orgarif.service.user.UserService

@Service
class UpdateRolesCommandHandler(private val userService: UserService) :
    CommandHandler.SessionHandler<UpdateRolesCommand, EmptyCommandResponse>() {

    override fun handle(
        command: UpdateRolesCommand,
        userSession: UserSession
    ): EmptyCommandResponse {
        userService.updateRoles(command.userId, command.roles)
        return EmptyCommandResponse
    }
}
