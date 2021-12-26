package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.OrganismeDao
import orgarif.service.DateService

@Service
class UpdateOrganismeTypeStructureCommandHandler(
    val organismeDao: OrganismeDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateOrganismeTypeStructureCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismeTypeStructureCommand): EmptyCommandResponse {
        organismeDao.updateTypeStructureId(command.id, command.typeStructureId, dateService.now())
        return EmptyCommandResponse
    }
}
