package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.service.utils.DateService

@Service
class UpdateInstancePresenceSuppleantsCommandHandler(
    val instanceDao: InstanceDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateInstancePresenceSuppleantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateInstancePresenceSuppleantsCommand): EmptyCommandResponse {
        instanceDao.updatePresenceSuppleants(
            command.instanceId, command.presenceSuppleants, dateService.now())
        return EmptyCommandResponse
    }
}
