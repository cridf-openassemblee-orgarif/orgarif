package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.LienDeliberationId
import orgarif.repository.LienDeliberationDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddLienDeliberationCommandHandler(
    val lienDeliberationDao: LienDeliberationDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<AddLienDeliberationCommand, AddLienDeliberationCommandResponse>() {

    override fun handle(command: AddLienDeliberationCommand): AddLienDeliberationCommandResponse {
        val id = randomService.id<LienDeliberationId>()
        val now = dateService.now()
        lienDeliberationDao.insert(
            LienDeliberationDao.Record(
                id = id,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                deliberationId = command.deliberationId,
                comment = command.comment,
                creationDate = now,
                status = ItemStatus.live,
                lastModificationDate = now))
        return AddLienDeliberationCommandResponse(id)
    }
}
