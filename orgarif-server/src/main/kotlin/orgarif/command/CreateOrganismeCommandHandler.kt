package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus.live
import orgarif.domain.OrganismeId
import orgarif.repository.OrganismeDao
import orgarif.service.utils.DateService
import orgarif.service.utils.random.RandomService

@Service
class CreateOrganismeCommandHandler(
    private val organismeDao: OrganismeDao,
    private val randomService: RandomService,
    private val dateService: DateService
) : CommandHandler.Handler<CreateOrganismeCommand, CreateOrganismeCommandResponse>() {

    override fun handle(command: CreateOrganismeCommand): CreateOrganismeCommandResponse {
        val organismeId = randomService.id<OrganismeId>()
        val now = dateService.now()
        organismeDao.insert(
            OrganismeDao.Record(
                id = organismeId,
                nom = command.nom,
                departementId = null,
                natureJuridiqueId = null,
                secteurId = null,
                typeStructureId = null,
                nombreRepresentants = 0,
                presenceSuppleants = false,
                status = live,
                creationDate = now,
                lastModificationDate = now))
        return CreateOrganismeCommandResponse(organismeId)
    }
}
