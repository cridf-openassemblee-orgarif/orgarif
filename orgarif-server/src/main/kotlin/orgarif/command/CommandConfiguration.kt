package orgarif.command

import orgarif.domain.Role
import orgarif.domain.Role.user

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is AddDesignationCommand -> user
            is AddInstanceCommand -> user
            is AddLienDeliberationCommand -> user
            is CreateDeliberationCommand -> user
            is CreateDepartementCommand -> user
            is CreateNatureJuridiqueCommand -> user
            is CreateOrganismeCommand -> user
            is CreateRepresentantCommand -> user
            is CreateSecteurCommand -> user
            is CreateTypeStructureCommand -> user
            is DevLoginCommand -> null
            is LoginCommand -> null
            is RegisterCommand -> null
            is UpdateDepartementCommand -> user
            is UpdateDepartementStatusCommand -> user
            is UpdateDesignationDatesCommand -> user
            is UpdateDesignationStatusCommand -> user
            is UpdateInstanceNombreRepresentantsCommand -> user
            is UpdateInstanceNomCommand -> user
            is UpdateInstancePresenceSuppleantsCommand -> user
            is UpdateInstanceStatusCommand -> user
            is UpdateLienDeliberationCommentCommand -> user
            is UpdateLienDeliberationStatusCommand -> user
            is UpdateNatureJuridiqueLibelleCommand -> user
            is UpdateNatureJuridiqueStatusCommand -> user
            is UpdateOrganismeDepartementCommand -> user
            is UpdateOrganismeNatureJuridiqueCommand -> user
            is UpdateOrganismeNombreRepresentantsCommand -> user
            is UpdateOrganismeNomCommand -> user
            is UpdateOrganismePresenceSuppleantsCommand -> user
            is UpdateOrganismeSecteurCommand -> user
            is UpdateOrganismeStatusCommand -> user
            is UpdateOrganismeTypeStructureCommand -> user
            is UpdateSecteurLibelleCommand -> user
            is UpdateSecteurStatusCommand -> user
            is UpdateTypeStructureLibelleCommand -> user
            is UpdateTypeStructureStatusCommand -> user
        }
}
