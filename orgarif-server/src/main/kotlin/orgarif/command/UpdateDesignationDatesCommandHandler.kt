package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.DesignationDao
import orgarif.service.utils.DateService

@Service
class UpdateDesignationDatesCommandHandler(
    private val designationDao: DesignationDao,
    private val dateService: DateService
) : CommandHandler.Handler<UpdateDesignationDatesCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateDesignationDatesCommand): EmptyCommandResponse {
        val now = dateService.now()
        designationDao.updateDates(command.designationId, command.startDate, command.endDate, now)
        return EmptyCommandResponse
    }
}
