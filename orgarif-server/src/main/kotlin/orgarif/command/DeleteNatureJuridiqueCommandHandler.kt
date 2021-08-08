package orgarif.command

import org.springframework.stereotype.Service
import orgarif.error.DisplayMessageException
import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.OrganismeDao
import orgarif.repository.RepresentantDao
import orgarif.repository.SecteurDao

@Service
class DeleteNatureJuridiqueCommandHandler(val organismeDao: OrganismeDao, val natureJuridiqueDao: NatureJuridiqueDao) :
    CommandHandler.Handler<DeleteNatureJuridiqueCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteNatureJuridiqueCommand): EmptyCommandResponse {
        val organismes = organismeDao.countByNatureJuridique(command.id)
        if (organismes != 0) {
            throw DisplayMessageException("La nature juridique est utilisée par des organismes", "$command")
        }
        natureJuridiqueDao.delete(command.id)
        return EmptyCommandResponse
    }

}
