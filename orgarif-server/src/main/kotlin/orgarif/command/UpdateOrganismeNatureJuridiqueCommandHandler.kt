package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao

@Service
class UpdateOrganismeNatureJuridiqueCommandHandler(val organismeDao: OrganismeDao) :
    NeutralCommandHandler<UpdateOrganismeNatureJuridiqueCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeNatureJuridiqueCommand):
            EmptyCommandResponse {
        organismeDao.updateNatureJuridiqueId(command.id, command.natureJuridiqueId)
        return EmptyCommandResponse
    }

}
