package orgarif.command

import org.springframework.stereotype.Service
import orgarif.service.user.UserService

@Service
class AdminUpdateRolesCommandHandler(private val userService: UserService) :
    CommandHandler.Handler<AdminUpdateRolesCommand, EmptyCommandResponse>() {

    override fun handle(command: AdminUpdateRolesCommand): EmptyCommandResponse {
        userService.updateRoles(command.userId, command.roles)
        return EmptyCommandResponse
    }
}
