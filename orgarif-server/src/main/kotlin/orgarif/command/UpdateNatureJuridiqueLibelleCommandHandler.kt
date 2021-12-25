package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.SecteurDao
import orgarif.service.DateService

@Service
class UpdateNatureJuridiqueLibelleCommandHandler(
    val natureJuridiqueDao: NatureJuridiqueDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateNatureJuridiqueLibelleCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateNatureJuridiqueLibelleCommand):
            EmptyCommandResponse {
        natureJuridiqueDao.updateLibelle(command.id, command.libelle, dateService.now())
        return EmptyCommandResponse
    }

}
