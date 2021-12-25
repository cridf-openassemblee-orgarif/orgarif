package orgarif.command

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.domain.RepresentantId
import orgarif.domain.RepresentationId
import orgarif.repository.EluDao
import orgarif.repository.RepresentantDao
import orgarif.repository.RepresentationDao
import orgarif.serialization.OrgarifUuidIdSerializer
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils.serializeUuid
import java.time.Instant

@Service
class MoveRepresentationCommandHandler(
    val representationDao: RepresentationDao,
    val eluDao: EluDao,
    val representantDao: RepresentantDao,

    val randomService: RandomService,
    val dateService: DateService
) :
    CommandHandler.Handler<MoveRepresentationCommand, EmptyCommandResponse>() {

    private val logger = KotlinLogging.logger {}

    override fun handle(command: MoveRepresentationCommand): EmptyCommandResponse {
        val now = dateService.now()
        // failed to write a dao method with a join - log nodes ticktick id 5fa9d45aa24d5700ebe5fa12
        // TODO creser et doc
        // ne pas remonter depuis le client les infos sur la liste de départ
        // par exemple, dans le scenario 2 user edite meme representant, la sourceList pourrait avoir changé
        val sourceRepresentant = representationDao.fetch(command.id)
            ?: throw IllegalArgumentException("${command.id}")
        val sourceList = representationDao.fetchByOrganismeInstance(
            sourceRepresentant.organismeId,
            sourceRepresentant.instanceId
        )
            .filter { it.id != sourceRepresentant.id }
            .sortedBy { it.position }
        val isSameList = let {
            sourceRepresentant.organismeId == command.toOrganismeId
                    && sourceRepresentant.instanceId == command.toInstanceId
        }
        val destinationList = if (isSameList) {
            sourceList
        } else {
            representationDao.fetchByOrganismeInstance(
                command.toOrganismeId,
                command.toInstanceId
            )
                .sortedBy { it.position }
        }.toMutableList()
        logger.debug { "source ${sourceList.size} destination ${destinationList.size}" }
        // update new representant position
        representationDao.updateRepresentation(
            command.id,
            command.toOrganismeId,
            command.toInstanceId,
            command.toPosition,
            now
        )
        let {
            destinationList.add(command.toPosition, sourceRepresentant)
            updateList(destinationList, command.id, now)
        }
        if (!isSameList) {
            updateList(sourceList, command.id, now)
        }
        return EmptyCommandResponse
    }

    fun updateList(
        list: List<RepresentationDao.Record>,
        updatedRepresentationId: RepresentationId,
        now: Instant
    ) {
        logger.debug {
            val s = StringBuilder("Update list")
            list.forEach { representation ->
                s.appendLine(
                    "${representation.id} ${representantLabel(representation.representantId)} " +
                            "${representation.position}"
                )
            }
            s
        }
        list.forEachIndexed { index, representation ->
            if (index != representation.position && representation.id != updatedRepresentationId) {
                logger.debug {
                    "Update position ${representation.id} ${representantLabel(representation.representantId)} $index"
                }
                // FIXMENOW batcher
                representationDao.updatePosition(representation.id, index, now)
            } else {
                logger.debug {
                    "Don't move ${representation.id} ${representantLabel(representation.representantId)} $index"
                }
            }
        }
    }

    fun representantLabel(representantId: RepresentantId?): String {
        // FIXME[migration] remove, param est representantId: RepresentantId
        representantId!!
        val r = representantDao.fetch(representantId)
            ?: throw IllegalArgumentException("$representantId")
        return r.eluId?.let { eluId ->
            val e = eluDao.fetch(eluId)
                ?: throw IllegalArgumentException("eluId")
            "[elu] ${e.prenom} ${e.nom}"
        } ?: "${r.prenom} ${r.nom}"
    }
}
