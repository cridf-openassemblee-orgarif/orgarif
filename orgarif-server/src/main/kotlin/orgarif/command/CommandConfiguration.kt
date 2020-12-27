package orgarif.command

import orgarif.domain.AuthenticationLevel

object CommandConfiguration {
    fun authenticationLevel(command: Command) = when (command) {
        is AddInstanceCommand -> AuthenticationLevel.admin
        is AddLienDeliberationCommand -> AuthenticationLevel.admin
        is AddRepresentantCommand -> AuthenticationLevel.admin
        is CreateDeliberationAndAddLienCommand -> AuthenticationLevel.admin
        is CreateOrganismeCommand -> AuthenticationLevel.admin
        is DeleteInstanceCommand -> AuthenticationLevel.admin
        is DeleteRepresentantCommand -> AuthenticationLevel.admin
        is LoginCommand -> AuthenticationLevel.loggedOut
        is MoveRepresentantCommand -> AuthenticationLevel.admin
        is RegisterCommand -> AuthenticationLevel.loggedOut
        is UpdateOrganismeNatureJuridiqueCommand -> AuthenticationLevel.admin
        is UpdateOrganismePartageRepresentantsCommand -> AuthenticationLevel.admin
        is UpdateOrganismeSecteurCommand -> AuthenticationLevel.admin
        is UpdateOrganismeTypeStructureCommand -> AuthenticationLevel.admin
    }
}