package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus.live
import orgarif.domain.LienDeliberationId
import orgarif.repository.LienDeliberationDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class AddLienDeliberationCommandHandler(
    private val lienDeliberationDao: LienDeliberationDao,
    private val randomService: RandomService,
    private val dateService: DateService
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
                status = live,
                creationDate = now,
                lastModificationDate = now))
        return AddLienDeliberationCommandResponse(id)
    }
}
