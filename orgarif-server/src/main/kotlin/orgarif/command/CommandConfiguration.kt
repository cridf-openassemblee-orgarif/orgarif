package orgarif.command

import orgarif.domain.Role
import orgarif.domain.Role.Admin

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is AdminUpdateRolesCommand -> Admin
            is DevLoginCommand -> null
            is LoginCommand -> null
            is RegisterCommand -> null
        }
}
