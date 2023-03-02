package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.TypeStructureDao
import orgarif.service.utils.DateService

@Service
class UpdateTypeStructureLibelleCommandHandler(
    val typeStructureDao: TypeStructureDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateTypeStructureLibelleCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateTypeStructureLibelleCommand): EmptyCommandResponse {
        typeStructureDao.updateLibelle(command.id, command.libelle, dateService.now())
        return EmptyCommandResponse
    }
}
