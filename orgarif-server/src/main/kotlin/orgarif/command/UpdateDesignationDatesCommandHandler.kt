package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.DesignationDao
import orgarif.service.DateService

@Service
class UpdateDesignationDatesCommandHandler(
    val designationDao: DesignationDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateDesignationDatesCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateDesignationDatesCommand): EmptyCommandResponse {
        val now = dateService.now()
        designationDao.updateDates(command.designationId, command.startDate, command.endDate, now)
        return EmptyCommandResponse
    }
}
