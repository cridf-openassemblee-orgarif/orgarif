package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.sql.OrganismeDao

@Service
class UpdateOrganismeTypeStructureCommandHandler(val organismeDao: OrganismeDao) :
    NeutralCommandHandler<UpdateOrganismeTypeStructureCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeTypeStructureCommand):
            EmptyCommandResponse {
        organismeDao.updateTypeStructureId(command.id, command.typeStructureId)
        return EmptyCommandResponse
    }

}
