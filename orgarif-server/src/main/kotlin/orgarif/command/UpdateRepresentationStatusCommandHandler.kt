package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.RepresentationDao
import orgarif.service.DateService

@Service
class UpdateRepresentationStatusCommandHandler(val representationDao: RepresentationDao, val dateService: DateService) :
    CommandHandler.Handler<UpdateRepresentationStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateRepresentationStatusCommand): EmptyCommandResponse {
        representationDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }

}
