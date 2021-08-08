package orgarif.command

import org.springframework.stereotype.Service
import orgarif.error.DisplayMessageException
import orgarif.repository.OrganismeDao
import orgarif.repository.RepresentantDao
import orgarif.repository.SecteurDao

@Service
class DeleteSecteurCommandHandler(val organismeDao: OrganismeDao, val secteurDao: SecteurDao) :
    CommandHandler.Handler<DeleteSecteurCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteSecteurCommand): EmptyCommandResponse {
        val organismes = organismeDao.countBySecteur(command.id)
        if (organismes != 0) {
            throw DisplayMessageException("Le secteur est utilisé par des organismes", "$command")
        }
        secteurDao.delete(command.id)
        return EmptyCommandResponse
    }

}
