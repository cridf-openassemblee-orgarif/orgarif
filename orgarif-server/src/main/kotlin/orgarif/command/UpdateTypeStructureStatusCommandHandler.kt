package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.*
import orgarif.service.DateService

@Service
class UpdateTypeStructureStatusCommandHandler(
    val organismeDao: OrganismeDao,
    val typeStructureDao: TypeStructureDao,
    val dateService: DateService
) : CommandHandler.Handler<UpdateTypeStructureStatusCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateTypeStructureStatusCommand): EmptyCommandResponse {
        typeStructureDao.updateStatus(command.id, command.status, dateService.now())
        return EmptyCommandResponse
    }
}
