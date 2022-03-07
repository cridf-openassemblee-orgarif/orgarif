package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.DepartementDao
import orgarif.service.DateService

@Service
class UpdateDepartementStatusCommandHandler(
    val departementDao: DepartementDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateDepartementStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateDepartementStatusCommand): EmptyCommandResponse {
        departementDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
