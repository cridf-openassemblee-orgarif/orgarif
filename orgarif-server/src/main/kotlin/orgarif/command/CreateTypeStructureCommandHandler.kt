package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.TypeStructureId
import orgarif.repository.TypeStructureDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateTypeStructureCommandHandler(
    val typeStructureDao: TypeStructureDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<CreateTypeStructureCommand, CreateTypeStructureCommandResponse>() {

    override fun handle(command: CreateTypeStructureCommand): CreateTypeStructureCommandResponse {
        val id = randomService.id<TypeStructureId>()
        val now = dateService.now()
        typeStructureDao.insert(
            TypeStructureDao.Record(
                id = id,
                libelle = command.libelle,
                status = ItemStatus.live,
                lastModificationDate = now))
        return CreateTypeStructureCommandResponse(id)
    }
}
