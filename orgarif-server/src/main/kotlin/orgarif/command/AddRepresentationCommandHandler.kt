package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus.live
import orgarif.domain.RepresentationId
import orgarif.repository.RepresentationDao
import orgarif.repository.SuppleanceDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddRepresentationCommandHandler(
    val representationDao: RepresentationDao,
    val suppleanceDao: SuppleanceDao,
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
        val r =
            RepresentationDao.Record(
                id = representationId,
                representantId = command.representantId,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                position = newPosition,
                startDate = command.startDate,
                endDate = null,
                status = live,
                creationDate = now,
                lastModificationDate = now)
        representationDao.insert(r)
        if (command.suppleantId != null) {
            suppleanceDao.insert(
                SuppleanceDao.Record(
                    id = randomService.id(),
                    representantId = command.suppleantId,
                    representationId = r.id,
                    organismeId = command.organismeId,
                    startDate = command.suppleantStartDate,
                    endDate = null,
                    status = live,
                    creationDate = now,
                    lastModificationDate = now))
        }
        return AddRepresentationCommandResponse(representationId)
    }
}
