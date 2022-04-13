package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus.live
import orgarif.repository.DesignationDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddDesignationCommandHandler(
    val designationDao: DesignationDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<AddDesignationCommand, AddDesignationCommandResponse>() {

    override fun handle(command: AddDesignationCommand): AddDesignationCommandResponse {
        val now = dateService.now()
        val r =
            DesignationDao.Record(
                id = randomService.id(),
                representantId = command.representantId,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                type = command.type,
                position = command.position,
                startDate = command.startDate,
                endDate = null,
                status = live,
                creationDate = now,
                lastModificationDate = now)
        designationDao.insert(r)
        return AddDesignationCommandResponse(r.id)
    }
}
