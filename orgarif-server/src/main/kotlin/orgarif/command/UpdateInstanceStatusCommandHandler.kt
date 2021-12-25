package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.repository.LienDeliberationDao
import orgarif.repository.RepresentationDao
import orgarif.service.DateService

@Service
class UpdateInstanceStatusCommandHandler(
    val instanceDao: InstanceDao,
    val dateService: DateService
) :
    CommandHandler.Handler<UpdateInstanceStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateInstanceStatusCommand): EmptyCommandResponse {
        instanceDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }

}
