package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.RepresentationDao
import orgarif.repository.SuppleanceDao
import orgarif.service.DateService

@Service
class UpdateRepresentationStatusCommandHandler(
    val representationDao: RepresentationDao,
    val suppleanceDao: SuppleanceDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateRepresentationStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateRepresentationStatusCommand): EmptyCommandResponse {
        val now = dateService.now()
        representationDao.updateStatus(command.id, command.status, now)
        if (command.suppleanceId != null) {
            suppleanceDao.updateStatus(command.suppleanceId, command.status, now)
        }
        return EmptyCommandResponse
    }
}
