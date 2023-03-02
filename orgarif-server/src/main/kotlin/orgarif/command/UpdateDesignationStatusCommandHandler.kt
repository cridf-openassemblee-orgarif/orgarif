package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.DesignationDao
import orgarif.service.utils.DateService

@Service
class UpdateDesignationStatusCommandHandler(
    private val designationDao: DesignationDao,
    private val dateService: DateService
) : CommandHandler.Handler<UpdateDesignationStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateDesignationStatusCommand): EmptyCommandResponse {
        val now = dateService.now()
        designationDao.updateStatus(command.id, command.status, now)
        return EmptyCommandResponse
    }
}
