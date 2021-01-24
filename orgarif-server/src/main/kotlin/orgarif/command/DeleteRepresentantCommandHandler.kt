package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.RepresentantDao

@Service
class DeleteRepresentantCommandHandler(val representantDao: RepresentantDao) :
    NeutralCommandHandler<DeleteRepresentantCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteRepresentantCommand): EmptyCommandResponse {
        representantDao.delete(command.id)
        return EmptyCommandResponse
    }

}
