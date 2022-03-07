package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.RepresentationDao
import orgarif.repository.SuppleanceDao
import orgarif.service.DateService

@Service
class UpdateRepresentationDatesCommandHandler(
    val representationDao: RepresentationDao,
    val suppleanceDao: SuppleanceDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateRepresentationDatesCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateRepresentationDatesCommand): EmptyCommandResponse {
        val now = dateService.now()
        representationDao.updateStartDate(
            command.representationId, command.representationStartDate, now)
        if (command.suppleanceId != null) {
            suppleanceDao.updateStartDate(command.suppleanceId, command.suppleanceStartDate, now)
        }
        return EmptyCommandResponse
    }
}
