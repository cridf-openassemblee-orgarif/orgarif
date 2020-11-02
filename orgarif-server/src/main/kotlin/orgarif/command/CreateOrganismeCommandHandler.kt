package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.OrganismeId
import orgarif.domain.UserSession
import orgarif.repository.sql.OrganismeDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateOrganismeCommandHandler(val organismeDao: OrganismeDao,
                                    val randomService: RandomService,
                                    val dateService: DateService) :
        LoggedInCommandHandler<CreateOrganismeCommand, CreateOrganismeCommandResponse>() {

    override fun handle(command: CreateOrganismeCommand, userSession: UserSession): CreateOrganismeCommandResponse {
        val organismeId = OrganismeId(randomService.randomUUID())
        val now = dateService.now()
        organismeDao.insert(OrganismeDao.Record(
                id = organismeId,
                nom = command.nom,
                secteurId = null,
                natureJuridiqueId = null,
                typeStructureId = null,
                nombreRepresentants = null,
                nombreSuppleants = null,
                partageRepresentants = false,
                creationDate = now,
                lastModificationDate = now))
        return CreateOrganismeCommandResponse(organismeId)
    }

}
