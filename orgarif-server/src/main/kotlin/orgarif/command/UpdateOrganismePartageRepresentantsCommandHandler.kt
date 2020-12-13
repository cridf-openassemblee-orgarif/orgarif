package orgarif.command

import org.springframework.stereotype.Service
import orgarif.repository.sql.OrganismeDao

@Service
class UpdateOrganismePartageRepresentantsCommandHandler(val organismeDao: OrganismeDao) :
        NeutralCommandHandler<UpdateOrganismePartageRepresentantsCommand, EmptyCommandResponse>() {

    override fun handle(command: UpdateOrganismePartageRepresentantsCommand):
            EmptyCommandResponse {
        organismeDao.updatePartageRepresentants(command.id, command.partageRepresentants)
        return EmptyCommandResponse
    }

}
