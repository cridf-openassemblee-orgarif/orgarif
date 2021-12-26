package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus.*
import orgarif.domain.RepresentationId
import orgarif.repository.RepresentationDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddRepresentationCommandHandler(
    val representationDao: RepresentationDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<AddRepresentationCommand, AddRepresentationCommandResponse>() {

    override fun handle(command: AddRepresentationCommand): AddRepresentationCommandResponse {
        val representationId = randomService.id<RepresentationId>()
        val now = dateService.now()
        val newPosition =
            representationDao.fetchCurrentPositionByOrganismeInstance(
                    command.organismeId, command.instanceId)
                ?.let { it + 1 }
                ?: 0
        representationDao.insert(
            RepresentationDao.Record(
                id = representationId,
                representantId = command.representantId,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                position = newPosition,
                startDate = null,
                endDate = null,
                creationDate = now,
                status = live,
                lastModificationDate = now))
        return AddRepresentationCommandResponse(representationId)
    }
}
