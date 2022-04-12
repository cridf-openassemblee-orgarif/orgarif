package orgarif.command

import orgarif.domain.Role

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is DevLoginCommand -> null
            is LoginCommand -> null
            is RegisterCommand -> null
        }
}
