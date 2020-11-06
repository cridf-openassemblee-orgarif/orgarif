package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        // TODO loggedIn
        is CreateOrganismeCommand -> AuthenticationLevel.neutral
        is LoginCommand -> AuthenticationLevel.loggedOut
        is RegisterCommand -> AuthenticationLevel.loggedOut
        // TODO loggedIn
        is UpdateOrganismeNatureJuridiqueCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is UpdateOrganismeSecteurCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is UpdateOrganismeTypeStructureCommand -> AuthenticationLevel.neutral
    }
}