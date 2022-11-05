package orgarif.service.utils

import javax.annotation.PreDestroy
import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.repository.log.DeploymentLogDao
import orgarif.service.ApplicationInstance
import orgarif.service.DateService

@Service
class PreDestroySchedulerService(
    private val deploymentLogDao: DeploymentLogDao,
    private val dateService: DateService
) {

    private val logger = KotlinLogging.logger {}

    @PreDestroy
    fun preDestroy() {
        logger.info { "Process predestroy tasks" }
        deploymentLogDao.updateShutdownTime(ApplicationInstance.deploymentLogId, dateService.now())
        logger.info { "Predestroy OK" }
    }
}
