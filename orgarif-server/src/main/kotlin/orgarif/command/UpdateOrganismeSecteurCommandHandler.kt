package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeSecteurCommandHandler(val organismeDao: OrganismeDao, val dateService: DateService) :
    NeutralCommandHandler<UpdateOrganismeSecteurCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeSecteurCommand):
            EmptyCommandResponse {
        organismeDao.updateSecteurId(command.id, command.secteurId, dateService.now())
        return EmptyCommandResponse
    }

}
