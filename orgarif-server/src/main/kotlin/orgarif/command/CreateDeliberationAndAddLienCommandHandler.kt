package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.DeliberationId
import orgarif.domain.ItemStatus
import orgarif.domain.LienDeliberationId
import orgarif.repository.DeliberationDao
import orgarif.repository.LienDeliberationDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateDeliberationAndAddLienCommandHandler(
    val deliberationDao: DeliberationDao,
    val lienDeliberationDao: LienDeliberationDao,
    val randomService: RandomService,
    val dateService: DateService
) :
    CommandHandler.Handler<CreateDeliberationAndAddLienCommand, CreateDeliberationAndAddLienCommandResponse>() {

    override fun handle(command: CreateDeliberationAndAddLienCommand): CreateDeliberationAndAddLienCommandResponse {
        val deliberationId = randomService.id<DeliberationId>()
        val now = dateService.now()
        deliberationDao.insert(
            DeliberationDao.Record(
                id = deliberationId,
                libelle = command.libelle,
                deliberationDate = command.deliberationDate,
                creationDate = now,
                lastModificationDate = now
            )
        )
        val lienDeliberationId = randomService.id<LienDeliberationId>()
        lienDeliberationDao.insert(
            LienDeliberationDao.Record(
                id = lienDeliberationId,
                deliberationId = deliberationId,
                organismeId = command.organismeId,
                instanceId = command.instanceId,
                creationDate = now,
                status = ItemStatus.live,
                lastModificationDate = now
            )
        )
        return CreateDeliberationAndAddLienCommandResponse(deliberationId, lienDeliberationId)
    }

}
