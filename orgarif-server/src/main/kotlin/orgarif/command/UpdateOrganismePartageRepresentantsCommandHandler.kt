package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismePartageRepresentantsCommandHandler(val organismeDao: OrganismeDao, val dateService: DateService) :
    CommandHandler.Handler<UpdateOrganismePartageRepresentantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismePartageRepresentantsCommand):
            EmptyCommandResponse {
        organismeDao.updatePartageRepresentants(command.id, command.partageRepresentants, dateService.now())
        return EmptyCommandResponse
    }

}
