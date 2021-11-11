package orgarif.command

import orgarif.domain.Role

object CommandConfiguration {

    fun role(command: Command): Role? = when (command) {
        is AddInstanceCommand -> Role.user
        is AddLienDeliberationCommand -> Role.user
        is AddRepresentantCommand -> Role.user
        is CreateDeliberationAndAddLienCommand -> Role.user
        is CreateOrganismeCommand -> Role.user
        is DeleteInstanceCommand -> Role.user
        is DeleteNatureJuridiqueCommand -> Role.user
        is DeleteRepresentantCommand -> Role.user
        is DeleteSecteurCommand -> Role.user
        is DeleteTypeStructureCommand -> Role.user
        is LoginCommand -> null
        is MoveRepresentantCommand -> Role.user
        is RegisterCommand -> null
        is UpdateNatureJuridiqueLibelleCommand -> Role.user
        is UpdateOrganismeNatureJuridiqueCommand -> Role.user
        is UpdateOrganismePartageRepresentantsCommand -> Role.user
        is UpdateOrganismeSecteurCommand -> Role.user
        is UpdateOrganismeTypeStructureCommand -> Role.user
        is UpdateSecteurLibelleCommand -> Role.user
        is UpdateTypeStructureLibelleCommand -> Role.user
    }

}