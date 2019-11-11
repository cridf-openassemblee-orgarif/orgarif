package orgarif.service

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import orgarif.domain.AuditTrail
import orgarif.domain.enumeration.AuditTrailAction
import orgarif.domain.enumeration.AuditTrailAction.*
import orgarif.repository.AuditTrailRepository
import orgarif.repository.search.AuditTrailSearchRepository
import orgarif.security.SecurityUtils
import java.io.Serializable

@Service
open class AuditTrailService(val auditTrailRepository: AuditTrailRepository,
                             val auditTrailSearchRepository: AuditTrailSearchRepository,
                             val objectMapper: ObjectMapper,
                             val dateService: DateService) {

    private val logger = LoggerFactory.getLogger(AuditTrailService::class.java)

    open fun <T : Serializable> logCreation(entity: T, id: Long) {
        logAuditTrail<Serializable, Serializable>(CREATE, entity.javaClass, id, entity, null, null, null)
    }

    open fun <T : Serializable, P : Serializable> logCreation(entity: T, id: Long,
                                                              parentEntityClass: Class<P>,
                                                              parentId: Long?) {
        logAuditTrail<Serializable, P>(CREATE, entity.javaClass, id, entity, parentEntityClass, parentId, null)
    }

    open fun <T : Serializable> logUpdate(entity: T, id: Long) {
        logAuditTrail<Serializable, Serializable>(UPDATE, entity.javaClass, id, entity, null, null, null)
    }

    open fun <T : Serializable, P : Serializable> logUpdate(entity: T, id: Long,
                                                            parentEntityClass: Class<P>?,
                                                            parentId: Long?) {
        logAuditTrail<Serializable, P>(UPDATE, entity.javaClass, id, entity, parentEntityClass, parentId, null)
    }

    open fun <T : Serializable> logDeletion(entityClass: Class<T>, id: Long) {
        logAuditTrail<T, Serializable>(DELETE, entityClass, id, null, null, null, null)
    }

    open fun <T : Serializable, P : Serializable> logDeletion(entityClass: Class<T>, id: Long,
                                                              parentEntityClass: Class<P>, parentId: Long?) {
        logAuditTrail(DELETE, entityClass, id, null, parentEntityClass, parentId, null)
    }

    open fun <T : Serializable, P : Serializable> logAuditTrail(action: AuditTrailAction,
                                                                entityClass: Class<T>,
                                                                entityId: Long,
                                                                entity: Serializable?,
                                                                parentEntityClass: Class<P>?,
                                                                parentEntityId: Long?,
                                                                reason: String?) {
        val at = AuditTrail()
        at.setEntity(entityClass.simpleName)
        at.setEntityId(entityId)
        if (parentEntityClass != null) {
            at.setParentEntity(parentEntityClass.simpleName)
            at.setParentEntityId(parentEntityId)
        }
        at.setAction(action)
        if (SecurityUtils.isAuthenticated()) {
            at.setUser(SecurityUtils.getCurrentUserLogin().get())
        }
        at.setDate(dateService.now())
        try {
            val jsonEntity = objectMapper.writeValueAsString(entity)
            at.setDetails(jsonEntity)
        } catch (e: JsonProcessingException) {
            logger.error("Couldn't write auditTrail json", e)
            throw RuntimeException(e)
        }

        at.setReason(reason)
        auditTrailRepository.save(at)
        auditTrailSearchRepository.save(at)
    }

}
