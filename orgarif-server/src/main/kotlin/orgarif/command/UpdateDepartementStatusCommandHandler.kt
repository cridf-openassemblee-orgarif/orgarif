package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.DepartementDao
import orgarif.service.utils.DateService

@Service
class UpdateDepartementStatusCommandHandler(
    private val departementDao: DepartementDao,
    private val dateService: DateService
) : CommandHandler.Handler<UpdateDepartementStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateDepartementStatusCommand): EmptyCommandResponse {
        departementDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
