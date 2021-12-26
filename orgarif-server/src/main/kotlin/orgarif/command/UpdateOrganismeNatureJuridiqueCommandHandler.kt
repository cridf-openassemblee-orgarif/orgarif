package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeNatureJuridiqueCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeNatureJuridiqueCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeNatureJuridiqueCommand): EmptyCommandResponse {
        organismeDao.updateNatureJuridiqueId(
            command.id, command.natureJuridiqueId, dateService.now())
        return EmptyCommandResponse
    }
}
