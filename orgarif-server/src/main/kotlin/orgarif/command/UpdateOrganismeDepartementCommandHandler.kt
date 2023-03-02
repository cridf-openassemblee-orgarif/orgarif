package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.utils.DateService

@Service
class UpdateOrganismeDepartementCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeDepartementCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeDepartementCommand): EmptyCommandResponse {
        organismeDao.updateDepartementId(command.id, command.departementId, dateService.now())
        return EmptyCommandResponse
    }
}
