package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.repository.DepartementDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateDepartementCommandHandler(
    val departementDao: DepartementDao,
    val randomService: RandomService,
    val dateService: DateService
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
