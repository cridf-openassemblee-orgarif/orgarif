package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.DepartementDao
import orgarif.service.utils.DateService

@Service
class UpdateDepartementCommandHandler(
    private val departementDao: DepartementDao,
    private val dateService: DateService
) : CommandHandler.Handler<UpdateDepartementCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateDepartementCommand): EmptyCommandResponse {
        departementDao.update(command.id, command.libelle, command.code, dateService.now())
        return EmptyCommandResponse
    }
}
