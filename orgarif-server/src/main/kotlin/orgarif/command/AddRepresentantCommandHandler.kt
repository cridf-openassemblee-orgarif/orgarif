package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.RepresentantId
import orgarif.repository.sql.RepresentantDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddRepresentantCommandHandler(val representantDao: RepresentantDao,
                                    val randomService: RandomService,
                                    val dateService: DateService) :
        NeutralCommandHandler<AddRepresentantCommand, AddRepresentantCommandResponse>() {

    override fun handle(command: AddRepresentantCommand): AddRepresentantCommandResponse {
        val representantId = RepresentantId(randomService.randomUUID())
        val now = dateService.now()
        val newPosition = representantDao.fetchCurrentPositionByOrganismeInstanceRepresentantOrSuppleant(
                command.organismeId,
                command.instanceId,
                command.representantOrSuppleant
        )?.let { it + 1 } ?: 0
        representantDao.insert(RepresentantDao.Record(
                id = representantId,
                eluId = command.eluId,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                position = newPosition,
                representantOrSuppleant = command.representantOrSuppleant,
                creationDate = now,
                lastModificationDate = now))
        return AddRepresentantCommandResponse(representantId)
    }

}
