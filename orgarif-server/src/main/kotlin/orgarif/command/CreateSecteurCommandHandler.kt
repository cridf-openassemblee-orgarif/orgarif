package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.SecteurId
import orgarif.repository.SecteurDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateSecteurCommandHandler(
    val secteurDao: SecteurDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<CreateSecteurCommand, CreateSecteurCommandResponse>() {

    override fun handle(command: CreateSecteurCommand): CreateSecteurCommandResponse {
        val id = randomService.id<SecteurId>()
        val now = dateService.now()
        secteurDao.insert(
            SecteurDao.Record(
                id = id,
                libelle = command.libelle,
                status = ItemStatus.live,
                creationDate = now,
                lastModificationDate = now))
        return CreateSecteurCommandResponse(id)
    }
}
