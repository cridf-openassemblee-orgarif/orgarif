package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.SecteurDao
import orgarif.repository.TypeStructureDao

@Service
class UpdateTypeStructureLibelleCommandHandler(val typeStructureDao: TypeStructureDao) :
    CommandHandler.Handler<UpdateTypeStructureLibelleCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateTypeStructureLibelleCommand):
            EmptyCommandResponse {
        typeStructureDao.updateLibelle(command.id, command.libelle)
        return EmptyCommandResponse
    }

}
