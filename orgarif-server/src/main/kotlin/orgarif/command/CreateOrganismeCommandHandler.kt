package orgarif.command

import org.springframework.stereotype.Service
import orgarif.domain.ItemStatus
import orgarif.domain.OrganismeId
import orgarif.repository.OrganismeDao
import orgarif.service.DateService
import orgarif.service.RandomService

@Service
class CreateOrganismeCommandHandler(
    val organismeDao: OrganismeDao,
    val randomService: RandomService,
    val dateService: DateService
) : CommandHandler.Handler<CreateOrganismeCommand, CreateOrganismeCommandResponse>() {

    override fun handle(command: CreateOrganismeCommand): CreateOrganismeCommandResponse {
        val organismeId = randomService.id<OrganismeId>()
        val now = dateService.now()
        organismeDao.insert(
            OrganismeDao.Record(
                id = organismeId,
                nom = command.nom,
                secteurId = null,
                natureJuridiqueId = null,
                typeStructureId = null,
                nombreRepresentants = null,
                creationDate = now,
                status = ItemStatus.live,
                lastModificationDate = now))
        return CreateOrganismeCommandResponse(organismeId)
    }
}
