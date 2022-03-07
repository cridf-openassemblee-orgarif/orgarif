package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.DeliberationId
import orgarif.domain.ItemStatus
import orgarif.repository.DeliberationDao
import orgarif.repository.LienDeliberationDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateDeliberationCommandHandler(
    val deliberationDao: DeliberationDao,
    val lienDeliberationDao: LienDeliberationDao,
    val randomService: RandomService,
    val dateService: DateService
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
