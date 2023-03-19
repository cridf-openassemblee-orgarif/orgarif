package orgarif.command

import orgarif.domain.Role
import orgarif.domain.Role.Admin
import orgarif.domain.Role.User

object CommandConfiguration {

    fun role(command: Command): Role? =
        when (command) {
            is AddDesignationCommand -> User
            is AddInstanceCommand -> User
            is AddLienDeliberationCommand -> User
            is AdminUpdateRolesCommand -> Admin
            is CreateDeliberationCommand -> User
            is CreateDepartementCommand -> User
            is CreateNatureJuridiqueCommand -> User
            is CreateOrganismeCommand -> User
            is CreateRepresentantCommand -> User
            is CreateSecteurCommand -> User
            is CreateTypeStructureCommand -> User
            is DevLoginCommand -> null
            is LoginCommand -> null
            is RegisterCommand -> null
            is UpdateDepartementCommand -> User
            is UpdateDepartementStatusCommand -> User
            is UpdateDesignationDatesCommand -> User
            is UpdateDesignationStatusCommand -> User
            is UpdateInstanceNombreRepresentantsCommand -> User
            is UpdateInstanceNomCommand -> User
            is UpdateInstancePresenceSuppleantsCommand -> User
            is UpdateInstanceStatusCommand -> User
            is UpdateLienDeliberationCommentCommand -> User
            is UpdateLienDeliberationStatusCommand -> User
            is UpdateNatureJuridiqueLibelleCommand -> User
            is UpdateNatureJuridiqueStatusCommand -> User
            is UpdateOrganismeDepartementCommand -> User
            is UpdateOrganismeNatureJuridiqueCommand -> User
            is UpdateOrganismeNombreRepresentantsCommand -> User
            is UpdateOrganismeNomCommand -> User
            is UpdateOrganismePresenceSuppleantsCommand -> User
            is UpdateOrganismeSecteurCommand -> User
            is UpdateOrganismeStatusCommand -> User
            is UpdateOrganismeTypeStructureCommand -> User
            is UpdatePasswordCommand -> User
            is UpdateSecteurLibelleCommand -> User
            is UpdateSecteurStatusCommand -> User
            is UpdateTypeStructureLibelleCommand -> User
            is UpdateTypeStructureStatusCommand -> User
        }
}
