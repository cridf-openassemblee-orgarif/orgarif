package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.NatureJuridiqueDao
import orgarif.repository.OrganismeDao
import orgarif.service.utils.DateService

@Service
class UpdateNatureJuridiqueStatusCommandHandler(
    val organismeDao: OrganismeDao,
    val natureJuridiqueDao: NatureJuridiqueDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateNatureJuridiqueStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateNatureJuridiqueStatusCommand): EmptyCommandResponse {
        natureJuridiqueDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
