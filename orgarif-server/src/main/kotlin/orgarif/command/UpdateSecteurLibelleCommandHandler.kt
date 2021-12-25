package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.repository.SecteurDao
import orgarif.service.DateService

@Service
class UpdateSecteurLibelleCommandHandler(val secteurDao: SecteurDao, val dateService: DateService) :
    CommandHandler.Handler<UpdateSecteurLibelleCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateSecteurLibelleCommand): EmptyCommandResponse {
        secteurDao.updateLibelle(command.id, command.libelle, dateService.now())
        return EmptyCommandResponse
    }

}
