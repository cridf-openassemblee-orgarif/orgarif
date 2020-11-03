package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        is CreateOrganismeCommand -> AuthenticationLevel.neutral
        is LoginCommand -> AuthenticationLevel.loggedOut
        is RegisterCommand -> AuthenticationLevel.loggedOut
    }
}