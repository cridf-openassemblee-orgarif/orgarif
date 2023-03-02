package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.NatureJuridiqueId
import orgarif.repository.NatureJuridiqueDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class CreateNatureJuridiqueCommandHandler(
    private val natureJuridiqueDao: NatureJuridiqueDao,
    private val randomService: RandomService,
    private val dateService: DateService
) : CommandHandler.Handler<CreateNatureJuridiqueCommand, CreateNatureJuridiqueCommandResponse>() {

    override fun handle(
        command: CreateNatureJuridiqueCommand
    ): CreateNatureJuridiqueCommandResponse {
        val id = randomService.id<NatureJuridiqueId>()
        val now = dateService.now()
        natureJuridiqueDao.insert(
            NatureJuridiqueDao.Record(
                id = id,
                libelle = command.libelle,
                status = ItemStatus.live,
                creationDate = now,
                lastModificationDate = now))
        return CreateNatureJuridiqueCommandResponse(id)
    }
}
