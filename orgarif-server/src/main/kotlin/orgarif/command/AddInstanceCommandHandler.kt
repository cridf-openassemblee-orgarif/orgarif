package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.InstanceId
import orgarif.domain.RepresentantId
import orgarif.repository.sql.InstanceDao
import orgarif.repository.sql.RepresentantDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddInstanceCommandHandler(val instanceDao:InstanceDao,
                                val randomService: RandomService,
                                val dateService: DateService) :
        NeutralCommandHandler<AddInstanceCommand, AddInstanceCommandResponse>() {

    override fun handle(command: AddInstanceCommand): AddInstanceCommandResponse {
        val instanceId = InstanceId(randomService.randomUUID())
        val now = dateService.now()
        instanceDao.insert(InstanceDao.Record(
                id = instanceId,
                nom = command.nomInstance,
                organismeId = command.organismeId,
                nombreRepresentants = null,
                nombreSuppleants = null,
                creationDate = now,
                lastModificationDate = now))
        return AddInstanceCommandResponse(instanceId)
    }

}