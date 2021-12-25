package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateInstanceNombreSuppleantsCommandHandler(val instanceDao: InstanceDao, val dateService: DateService) :
    CommandHandler.Handler<UpdateInstanceNombreSuppleantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateInstanceNombreSuppleantsCommand):
            EmptyCommandResponse {
        instanceDao.updateNombreSuppleants(command.instanceId, command.nombre, dateService.now())
        return EmptyCommandResponse
    }

}
