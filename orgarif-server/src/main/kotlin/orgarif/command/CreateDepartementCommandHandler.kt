package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.repository.DepartementDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class CreateDepartementCommandHandler(
    private val departementDao: DepartementDao,
    private val randomService: RandomService,
    private val dateService: DateService
) : CommandHandler.Handler<CreateDepartementCommand, CreateDepartementCommandResponse>() {

    override fun handle(command: CreateDepartementCommand): CreateDepartementCommandResponse {
        val now = dateService.now()
        val r =
            DepartementDao.Record(
                id = randomService.id(),
                libelle = command.libelle,
                code = command.code,
                status = ItemStatus.live,
                creationDate = now,
                lastModificationDate = now)
        departementDao.insert(r)
        return CreateDepartementCommandResponse(r.id)
    }
}
