package orgarif.command

import org.springframework.stereotype.Service
import orgarif.error.DisplayMessageException
import orgarif.repository.OrganismeDao
import orgarif.repository.SecteurDao
import orgarif.service.DateService

@Service
class UpdateSecteurStatusCommandHandler(
    val organismeDao: OrganismeDao,
    val secteurDao: SecteurDao,
    val dateService: DateService
) :
    CommandHandler.Handler<UpdateSecteurStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateSecteurStatusCommand): EmptyCommandResponse {
        secteurDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }

}
