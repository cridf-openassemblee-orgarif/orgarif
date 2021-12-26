package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.NatureJuridiqueId
import orgarif.repository.NatureJuridiqueDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateNatureJuridiqueCommandHandler(
    val natureJuridiqueDao: NatureJuridiqueDao,
    val randomService: RandomService,
    val dateService: DateService
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
                lastModificationDate = now))
        return CreateNatureJuridiqueCommandResponse(id)
    }
}
