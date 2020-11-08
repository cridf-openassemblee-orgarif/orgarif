package orgarif.command

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.domain.RepresentantId
import orgarif.repository.sql.EluDao
import orgarif.repository.sql.RepresentantDao
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils
import orgarif.utils.OrgarifStringUtils.serializeUuid
import orgarif.utils.Serializer
import orgarif.utils.Serializer.serialize
import java.time.Instant

@Service
class MoveRepresentantCommandHandler(
        val representantDao: RepresentantDao,
        val eluDao: EluDao,
        val randomService: RandomService,
        val dateService: DateService) :
        NeutralCommandHandler<MoveRepresentantCommand, EmptyCommandResponse>() {

    private val logger = KotlinLogging.logger {}

    override fun handle(command: MoveRepresentantCommand): EmptyCommandResponse {
        val now = dateService.now()
        val (sourceRepresentant, sourceList) = representantDao.fetchListById(command.id)
                .let {
                    val sourceRepresentant = it.find { it.id == command.id }
                            ?: throw IllegalStateException("${command.id}")
                    val sourceList = it.filter { it.id != command.id }
                            .sortedBy { it.position }
                    sourceRepresentant to sourceList
                }
        val isSameList = let {
            sourceRepresentant.organismeId == command.toOrganismeId
                    && sourceRepresentant.instanceId == command.toInstanceId
                    && sourceRepresentant.representantOrSuppleant == command.toRepresentantOrSuppleant
        }
        val destinationList = if (isSameList) {
            sourceList
        } else {
            representantDao.fetchByOrganismeInstanceRepresentantOrSuppleant(
                    command.toOrganismeId,
                    command.toInstanceId,
                    command.toRepresentantOrSuppleant)
                    .sortedBy { it.position }
        }.toMutableList()
        logger.debug { "source ${sourceList.size} destination ${destinationList.size}" }
        // update new representant position
        representantDao.updateRepresentant(command.id,
                command.toOrganismeId,
                command.toInstanceId,
                command.toPosition,
                command.toRepresentantOrSuppleant,
                now)
        let {
            destinationList.add(command.toPosition, sourceRepresentant)
            updateList(destinationList, command.id, now)
        }
        if (!isSameList) {
            updateList(sourceList, command.id, now)
        }
        return EmptyCommandResponse
    }

    fun updateList(list: List<RepresentantDao.Record>,
                   updatedRepresentantId: RepresentantId,
                   now: Instant) {
        logger.debug {
            val s = StringBuilder("Update list")
            list.forEach {
                val elu = eluDao.fetch(it.eluId)!!
                s.append("\n${serializeUuid(it.id.rawId)} ${elu.prenom} ${elu.nom} ${it.position}")
            }
            s
        }
        list.forEachIndexed { index, representant ->
            if (index != representant.position && representant.id != updatedRepresentantId) {
                logger.debug {
                    val elu = eluDao.fetch(representant.eluId)!!
                    "Update position ${serializeUuid(representant.id.rawId)} ${elu.prenom} ${elu.nom} $index"
                }
                representantDao.updatePosition(representant.id, index, now)
            } else {
                logger.debug {
                    val elu = eluDao.fetch(representant.eluId)!!
                    "Don't move ${serializeUuid(representant.id.rawId)} ${elu.prenom} ${elu.nom} $index"
                }
            }
        }
    }
}
