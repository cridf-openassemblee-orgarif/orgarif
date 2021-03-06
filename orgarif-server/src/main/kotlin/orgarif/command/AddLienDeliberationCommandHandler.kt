package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.LienDeliberationId
import orgarif.repository.LienDeliberationDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class AddLienDeliberationCommandHandler(
    val lienDeliberationDao: LienDeliberationDao,
    val randomService: RandomService,
    val dateService: DateService
) :
    CommandHandler.Handler<AddLienDeliberationCommand, AddLienDeliberationCommandResponse>() {

    override fun handle(command: AddLienDeliberationCommand): AddLienDeliberationCommandResponse {
        val id = randomService.id<LienDeliberationId>()
        val now = dateService.now()
        lienDeliberationDao.insert(
            LienDeliberationDao.Record(
                id = id,
                deliberationId = command.deliberationId,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                creationDate = now,
                lastModificationDate = now
            )
        )
        return AddLienDeliberationCommandResponse(id)
    }

}
