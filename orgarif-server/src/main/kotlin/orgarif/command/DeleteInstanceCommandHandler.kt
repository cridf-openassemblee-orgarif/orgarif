package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.sql.InstanceDao
import orgarif.repository.sql.LienDeliberationDao
import orgarif.repository.sql.RepresentantDao

@Service
class DeleteInstanceCommandHandler(
    val representantDao: RepresentantDao,
    val lienDeliberationDao: LienDeliberationDao,
    val instanceDao: InstanceDao
) :
    NeutralCommandHandler<DeleteInstanceCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteInstanceCommand): EmptyCommandResponse {
        representantDao.deleteByInstanceId(command.id)
        lienDeliberationDao.deleteByInstanceId(command.id)
        instanceDao.delete(command.id)
        return EmptyCommandResponse
    }

}
