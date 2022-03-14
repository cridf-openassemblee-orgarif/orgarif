package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.repository.LienDeliberationDao
import orgarif.service.DateService

@Service
class UpdateLienDeliberationStatusCommandHandler(
    val lienDeliberationDao: LienDeliberationDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateLienDeliberationStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateLienDeliberationStatusCommand): EmptyCommandResponse {
        lienDeliberationDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
