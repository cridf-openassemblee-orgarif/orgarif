package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.UserSession
import orgarif.service.user.UserService

@Service
class AdminUpdateRolesCommandHandler(private val userService: UserService) :
    CommandHandler.SessionHandler<AdminUpdateRolesCommand, EmptyCommandResponse>() {

    override fun handle(
        command: AdminUpdateRolesCommand,
        userSession: UserSession
    ): EmptyCommandResponse {
        userService.updateRoles(command.userId, command.roles)
        return EmptyCommandResponse
    }
}
