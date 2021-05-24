package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.InstanceDao
import orgarif.repository.LienDeliberationDao
import orgarif.repository.RepresentantDao

@Service
class DeleteInstanceCommandHandler(
    val representantDao: RepresentantDao,
    val lienDeliberationDao: LienDeliberationDao,
    val instanceDao: InstanceDao
) :
    CommandHandler.Handler<DeleteInstanceCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteInstanceCommand): EmptyCommandResponse {
        representantDao.deleteByInstanceId(command.id)
        lienDeliberationDao.deleteByInstanceId(command.id)
        instanceDao.delete(command.id)
        return EmptyCommandResponse
    }

}
