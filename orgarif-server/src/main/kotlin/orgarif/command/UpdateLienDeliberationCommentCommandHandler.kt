package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.LienDeliberationDao
import orgarif.service.DateService

@Service
class UpdateLienDeliberationCommentCommandHandler(
    val lienDeliberationDao: LienDeliberationDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateLienDeliberationCommentCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateLienDeliberationCommentCommand): EmptyCommandResponse {
        lienDeliberationDao.updateComment(command.id, command.comment, dateService.now())
        return EmptyCommandResponse
    }
}
