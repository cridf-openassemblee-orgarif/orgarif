package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus.live
import orgarif.repository.InstanceDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddInstanceCommandHandler(
    val instanceDao: InstanceDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<AddInstanceCommand, AddInstanceCommandResponse>() {

    override fun handle(command: AddInstanceCommand): AddInstanceCommandResponse {
        val instanceId = randomService.id<InstanceId>()
        val now = dateService.now()
        instanceDao.insert(
            InstanceDao.Record(
                id = instanceId,
                nom = command.nomInstance,
                organismeId = command.organismeId,
                nombreRepresentants = 0,
                presenceSuppleants = false,
                status = live,
                creationDate = now,
                lastModificationDate = now))
        return AddInstanceCommandResponse(instanceId)
    }
}
