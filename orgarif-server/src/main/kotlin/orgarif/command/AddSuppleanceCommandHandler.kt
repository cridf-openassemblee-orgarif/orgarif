package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus.*
import orgarif.repository.RepresentationDao
import orgarif.repository.SuppleanceDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddSuppleanceCommandHandler(
    val representationDao: RepresentationDao,
    val suppleanceDao: SuppleanceDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<AddSuppleanceCommand, EmptyCommandResponse>() {

    override fun handle(command: AddSuppleanceCommand): EmptyCommandResponse {
        val now = dateService.now()
        val organismeId =
            representationDao.fetch(command.representationId)?.organismeId
                ?: throw IllegalArgumentException("${command.representationId}")
        suppleanceDao.insert(
            SuppleanceDao.Record(
                id = randomService.id(),
                representantId = command.suppleantId,
                representationId = command.representationId,
                organismeId = organismeId,
                startDate = command.suppleantStartDate,
                endDate = null,
                creationDate = now,
                status = live,
                lastModificationDate = now))
        return EmptyCommandResponse
    }
}
