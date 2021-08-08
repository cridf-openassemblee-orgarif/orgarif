package orgarif.command

import org.springframework.stereotype.Service
import orgarif.error.DisplayMessageException
import orgarif.repository.*

@Service
class DeleteTypeStructureCommandHandler(val organismeDao: OrganismeDao, val typeStructureDao: TypeStructureDao) :
    CommandHandler.Handler<DeleteTypeStructureCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteTypeStructureCommand): EmptyCommandResponse {
        val organismes = organismeDao.countByTypeStructure(command.id)
        if (organismes != 0) {
            throw DisplayMessageException("Le type de structure est utilisé par des organismes", "$command")
        }
        typeStructureDao.delete(command.id)
        return EmptyCommandResponse
    }

}
