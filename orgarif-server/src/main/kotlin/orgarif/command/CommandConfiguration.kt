package orgarif.command

import orgarif.domain.Role
import orgarif.domain.Role.Admin
import orgarif.domain.Role.User

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is AdminUpdateRolesCommand -> Admin
            is DevLoginCommand -> null
            is LoginCommand -> null
            is RegisterCommand -> null
            is UpdatePasswordCommand -> User
        }
}
