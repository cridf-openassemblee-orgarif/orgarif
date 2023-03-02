package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.TypeStructureId
import orgarif.repository.TypeStructureDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class CreateTypeStructureCommandHandler(
    private val typeStructureDao: TypeStructureDao,
    private val randomService: RandomService,
    private val dateService: DateService
) : CommandHandler.Handler<CreateTypeStructureCommand, CreateTypeStructureCommandResponse>() {

    override fun handle(command: CreateTypeStructureCommand): CreateTypeStructureCommandResponse {
        val id = randomService.id<TypeStructureId>()
        val now = dateService.now()
        typeStructureDao.insert(
            TypeStructureDao.Record(
                id = id,
                libelle = command.libelle,
                status = ItemStatus.live,
                creationDate = now,
                lastModificationDate = now))
        return CreateTypeStructureCommandResponse(id)
    }
}
