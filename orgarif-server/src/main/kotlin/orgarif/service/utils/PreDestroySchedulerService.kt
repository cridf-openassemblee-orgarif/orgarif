package orgarif.service.utils

import javax.annotation.PreDestroy
import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.repository.log.DeploymentLogDao
import orgarif.service.ApplicationInstance
import orgarif.service.DateService

@Service
class PreDestroySchedulerService(
    val deploymentLogDao: DeploymentLogDao,
    val applicationInstance: ApplicationInstance,
    val dateService: DateService
) {

    private val logger = KotlinLogging.logger {}

    @PreDestroy
    fun preDestroy() {
        logger.info { "Process predestroy tasks" }
        deploymentLogDao.updateShutdownTime(applicationInstance.deploymentId, dateService.now())
        logger.info { "Predestroy OK" }
    }
}
