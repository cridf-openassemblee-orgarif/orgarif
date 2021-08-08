package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.SecteurDao

@Service
class UpdateNatureJuridiqueLibelleCommandHandler(val natureJuridiqueDao: NatureJuridiqueDao) :
    CommandHandler.Handler<UpdateNatureJuridiqueLibelleCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateNatureJuridiqueLibelleCommand):
            EmptyCommandResponse {
        natureJuridiqueDao.updateLibelle(command.id, command.libelle)
        return EmptyCommandResponse
    }

}
