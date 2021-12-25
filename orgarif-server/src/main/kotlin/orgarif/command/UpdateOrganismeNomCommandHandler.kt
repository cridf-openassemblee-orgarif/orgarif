package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeNomCommandHandler(val organismeDao: OrganismeDao, val dateService: DateService) :
    CommandHandler.Handler<UpdateOrganismeNomCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeNomCommand):
            EmptyCommandResponse {
        organismeDao.updateNom(command.id, command.nom, dateService.now())
        return EmptyCommandResponse
    }

}
