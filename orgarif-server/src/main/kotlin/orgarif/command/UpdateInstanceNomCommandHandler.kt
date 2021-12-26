package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.service.DateService

@Service
class UpdateInstanceNomCommandHandler(val instanceDao: InstanceDao, val dateService: DateService) :
    CommandHandler.Handler<UpdateInstanceNomCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateInstanceNomCommand): EmptyCommandResponse {
        instanceDao.updateNom(command.id, command.nom, dateService.now())
        return EmptyCommandResponse
    }
}
