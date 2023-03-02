package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.RepresentantId
import orgarif.repository.RepresentantDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class CreateRepresentantCommandHandler(
    private val representantDao: RepresentantDao,
    private val randomService: RandomService,
    private val dateService: DateService
) : CommandHandler.Handler<CreateRepresentantCommand, CreateRepresentantCommandResponse>() {

    override fun handle(command: CreateRepresentantCommand): CreateRepresentantCommandResponse {
        val id = randomService.id<RepresentantId>()
        representantDao.insert(
            RepresentantDao.Record(
                id,
                eluId = null,
                prenom = command.prenom,
                nom = command.nom,
                creationDate = dateService.now(),
                lastModificationDate = dateService.now()))
        return CreateRepresentantCommandResponse(id)
    }
}
