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
        is DeleteNatureJuridiqueCommand -> AuthenticationLevel.admin
        is DeleteRepresentantCommand -> AuthenticationLevel.admin
        is DeleteSecteurCommand -> AuthenticationLevel.admin
        is LoginCommand -> AuthenticationLevel.anonymous
        is MoveRepresentantCommand -> AuthenticationLevel.admin
        is RegisterCommand -> AuthenticationLevel.anonymous
        is UpdateNatureJuridiqueLibelleCommand -> AuthenticationLevel.admin
        is UpdateOrganismeNatureJuridiqueCommand -> AuthenticationLevel.admin
        is UpdateOrganismePartageRepresentantsCommand -> AuthenticationLevel.admin
        is UpdateOrganismeSecteurCommand -> AuthenticationLevel.admin
        is UpdateOrganismeTypeStructureCommand -> AuthenticationLevel.admin
        is UpdateSecteurLibelleCommand -> AuthenticationLevel.admin
    }
}