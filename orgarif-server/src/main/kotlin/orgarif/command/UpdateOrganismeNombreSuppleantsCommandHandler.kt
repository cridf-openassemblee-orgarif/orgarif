package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeNombreSuppleantsCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeNombreSuppleantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeNombreSuppleantsCommand): EmptyCommandResponse {
        organismeDao.updateNombreSuppleants(command.id, command.nombre, dateService.now())
        return EmptyCommandResponse
    }
}
