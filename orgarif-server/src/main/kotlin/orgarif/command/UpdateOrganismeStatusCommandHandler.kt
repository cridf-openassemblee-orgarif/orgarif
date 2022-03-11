package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeStatusCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeStatusCommand): EmptyCommandResponse {
        organismeDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
