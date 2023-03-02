package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.utils.DateService

@Service
class UpdateOrganismePresenceSuppleantsCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismePresenceSuppleantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismePresenceSuppleantsCommand): EmptyCommandResponse {
        organismeDao.updatePresenceSuppleants(
            command.organismeId, command.presenceSuppleants, dateService.now())
        return EmptyCommandResponse
    }
}
