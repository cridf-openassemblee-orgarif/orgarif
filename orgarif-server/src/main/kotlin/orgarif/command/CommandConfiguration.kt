package orgarif.command

import orgarif.domain.Role
import orgarif.domain.Role.*

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is AddInstanceCommand -> user
            is AddLienDeliberationCommand -> user
            is AddRepresentationCommand -> user
            is CreateDeliberationCommand -> user
            is CreateNatureJuridiqueCommand -> user
            is CreateOrganismeCommand -> user
            is CreateRepresentantCommand -> user
            is CreateSecteurCommand -> user
            is CreateTypeStructureCommand -> user
            is LoginCommand -> null
            is MoveRepresentationCommand -> user
            is RegisterCommand -> null
            is UpdateInstanceNombreRepresentantsCommand -> user
            is UpdateInstanceNomCommand -> user
            is UpdateInstancePresenceSuppleantsCommand -> user
            is UpdateInstanceStatusCommand -> user
            is UpdateNatureJuridiqueLibelleCommand -> user
            is UpdateNatureJuridiqueStatusCommand -> user
            is UpdateOrganismeNatureJuridiqueCommand -> user
            is UpdateOrganismeNombreRepresentantsCommand -> user
            is UpdateOrganismeNomCommand -> user
            is UpdateOrganismePresenceSuppleantsCommand -> user
            is UpdateOrganismeSecteurCommand -> user
            is UpdateOrganismeTypeStructureCommand -> user
            is UpdateRepresentationDatesCommand -> user
            is UpdateRepresentationStatusCommand -> user
            is UpdateSecteurLibelleCommand -> user
            is UpdateSecteurStatusCommand -> user
            is UpdateTypeStructureLibelleCommand -> user
            is UpdateTypeStructureStatusCommand -> user
        }
}
