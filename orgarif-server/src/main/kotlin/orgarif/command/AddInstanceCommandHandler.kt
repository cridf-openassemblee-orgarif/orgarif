package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.InstanceId
import orgarif.domain.ItemStatus.live
import orgarif.repository.InstanceDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class AddInstanceCommandHandler(
    private val instanceDao: InstanceDao,
    private val randomService: RandomService,
    private val dateService: DateService
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
