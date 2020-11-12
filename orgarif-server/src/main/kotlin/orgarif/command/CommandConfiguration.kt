package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        // TODO loggedIn
        is AddInstanceCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is AddRepresentantCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is CreateOrganismeCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is DeleteRepresentantCommand -> AuthenticationLevel.neutral
        is LoginCommand -> AuthenticationLevel.loggedOut
        is MoveRepresentantCommand -> AuthenticationLevel.neutral
        is RegisterCommand -> AuthenticationLevel.loggedOut
        // TODO loggedIn
        is UpdateOrganismeNatureJuridiqueCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is UpdateOrganismeSecteurCommand -> AuthenticationLevel.neutral
        // TODO loggedIn
        is UpdateOrganismeTypeStructureCommand -> AuthenticationLevel.neutral
    }
}