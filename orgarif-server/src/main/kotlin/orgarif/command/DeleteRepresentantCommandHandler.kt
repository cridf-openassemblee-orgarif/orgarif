package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.OrganismeId
import orgarif.domain.UserSession
import orgarif.repository.sql.OrganismeDao
import orgarif.repository.sql.RepresentantDao
import orgarif.service.DateService
import orgarif.service.RandomService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class DeleteRepresentantCommandHandler(val representantDao: RepresentantDao) :
        NeutralCommandHandler<DeleteRepresentantCommand, EmptyCommandResponse>() {

    override fun handle(command: DeleteRepresentantCommand): EmptyCommandResponse {
        representantDao.delete(command.id)
        return EmptyCommandResponse
    }

}
