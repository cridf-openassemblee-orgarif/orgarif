package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.SuppleanceDao
import orgarif.service.DateService

@Service
class UpdateSuppleanceStatusCommandHandler(
    val suppleanceDao: SuppleanceDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateSuppleanceStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateSuppleanceStatusCommand): EmptyCommandResponse {
        suppleanceDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
