package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.utils.DateService

@Service
class UpdateOrganismeSecteurCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeSecteurCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeSecteurCommand): EmptyCommandResponse {
        organismeDao.updateSecteurId(command.id, command.secteurId, dateService.now())
        return EmptyCommandResponse
    }
}
