package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.DeliberationId
import orgarif.domain.ItemStatus
import orgarif.repository.DeliberationDao
import orgarif.repository.LienDeliberationDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class CreateDeliberationCommandHandler(
    private val deliberationDao: DeliberationDao,
    private val lienDeliberationDao: LienDeliberationDao,
    private val randomService: RandomService,
    private val dateService: DateService
) : CommandHandler.Handler<CreateDeliberationCommand, CreateDeliberationCommandResponse>() {

    override fun handle(command: CreateDeliberationCommand): CreateDeliberationCommandResponse {
        val deliberationId = randomService.id<DeliberationId>()
        val now = dateService.now()
        deliberationDao.insert(
            DeliberationDao.Record(
                id = deliberationId,
                libelle = command.libelle,
                deliberationDate = command.deliberationDate,
                status = ItemStatus.live,
                creationDate = now,
                lastModificationDate = now))
        return CreateDeliberationCommandResponse(deliberationId)
    }
}
