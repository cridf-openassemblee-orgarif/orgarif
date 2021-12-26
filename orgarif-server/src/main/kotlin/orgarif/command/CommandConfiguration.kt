package orgarif.command

import orgarif.domain.Role
import orgarif.domain.Role.*

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is AddInstanceCommand -> user
            is AddLienDeliberationCommand -> user
            is AddRepresentationCommand -> user
            is CreateDeliberationAndAddLienCommand -> user
            is CreateNatureJuridiqueCommand -> user
            is CreateOrganismeCommand -> user
            is CreateSecteurCommand -> user
            is CreateTypeStructureCommand -> user
            is LoginCommand -> null
            is MoveRepresentationCommand -> user
            is RegisterCommand -> null
            is UpdateInstanceNombreRepresentantsCommand -> user
            is UpdateInstanceNombreSuppleantsCommand -> user
            is UpdateInstanceNomCommand -> user
            is UpdateInstanceStatusCommand -> user
            is UpdateNatureJuridiqueLibelleCommand -> user
            is UpdateNatureJuridiqueStatusCommand -> user
            is UpdateOrganismeNatureJuridiqueCommand -> user
            is UpdateOrganismeNombreRepresentantsCommand -> user
            is UpdateOrganismeNombreSuppleantsCommand -> user
            is UpdateOrganismeNomCommand -> user
            is UpdateOrganismeSecteurCommand -> user
            is UpdateOrganismeTypeStructureCommand -> user
            is UpdateRepresentationStatusCommand -> user
            is UpdateSecteurLibelleCommand -> user
            is UpdateSecteurStatusCommand -> user
            is UpdateTypeStructureLibelleCommand -> user
            is UpdateTypeStructureStatusCommand -> user
        }
}
