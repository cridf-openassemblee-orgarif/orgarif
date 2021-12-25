package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeNombreRepresentantsCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeNombreRepresentantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeNombreRepresentantsCommand): EmptyCommandResponse {
        organismeDao.updateNombreRepresentants(command.id, command.nombre, dateService.now())
        return EmptyCommandResponse
    }
}
