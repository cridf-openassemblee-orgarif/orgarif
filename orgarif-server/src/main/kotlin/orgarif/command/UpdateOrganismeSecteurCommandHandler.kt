package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.sql.OrganismeDao

@Service
class UpdateOrganismeSecteurCommandHandler(val organismeDao: OrganismeDao) :
    NeutralCommandHandler<UpdateOrganismeSecteurCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeSecteurCommand):
            EmptyCommandResponse {
        organismeDao.updateSecteurId(command.id, command.secteurId)
        return EmptyCommandResponse
    }

}
