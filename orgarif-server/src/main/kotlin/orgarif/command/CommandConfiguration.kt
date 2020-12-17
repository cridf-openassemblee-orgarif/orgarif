package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        is AddInstanceCommand -> AuthenticationLevel.loggedIn
        is AddLienDeliberationCommand -> AuthenticationLevel.loggedIn
        is AddRepresentantCommand -> AuthenticationLevel.loggedIn
        is CreateDeliberationAndAddLienCommand -> AuthenticationLevel.loggedIn
        is CreateOrganismeCommand -> AuthenticationLevel.loggedIn
        is DeleteInstanceCommand -> AuthenticationLevel.loggedIn
        is DeleteRepresentantCommand -> AuthenticationLevel.loggedIn
        is LoginCommand -> AuthenticationLevel.loggedOut
        is MoveRepresentantCommand -> AuthenticationLevel.loggedIn
        is RegisterCommand -> AuthenticationLevel.loggedOut
        is UpdateOrganismeNatureJuridiqueCommand -> AuthenticationLevel.loggedIn
        is UpdateOrganismePartageRepresentantsCommand-> AuthenticationLevel.loggedIn
        is UpdateOrganismeSecteurCommand -> AuthenticationLevel.loggedIn
        is UpdateOrganismeTypeStructureCommand -> AuthenticationLevel.loggedIn
    }
}