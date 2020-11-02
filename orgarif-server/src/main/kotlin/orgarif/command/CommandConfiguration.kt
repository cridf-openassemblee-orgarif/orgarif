package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        is CreateOrganismeCommand -> AuthenticationLevel.loggedIn
        is LoginCommand -> AuthenticationLevel.loggedOut
        is RegisterCommand -> AuthenticationLevel.loggedOut
    }
}