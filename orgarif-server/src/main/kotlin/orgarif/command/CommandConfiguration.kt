package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        is LoginCommand -> AuthenticationLevel.anonymous
        is RegisterCommand -> AuthenticationLevel.anonymous
    }
}