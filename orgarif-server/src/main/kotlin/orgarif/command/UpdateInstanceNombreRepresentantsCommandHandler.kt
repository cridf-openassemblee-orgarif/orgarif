package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.service.DateService

@Service
class UpdateInstanceNombreRepresentantsCommandHandler(
    val instanceDao: InstanceDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateInstanceNombreRepresentantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateInstanceNombreRepresentantsCommand): EmptyCommandResponse {
        instanceDao.updateNombreRepresentants(command.instanceId, command.nombre, dateService.now())
        return EmptyCommandResponse
    }
}
