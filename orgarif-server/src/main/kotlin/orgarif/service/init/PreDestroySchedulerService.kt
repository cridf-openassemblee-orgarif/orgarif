package orgarif.service.init

import orgarif.repository.log.DeploymentLogDao
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.DateService
import javax.annotation.PreDestroy
import mu.KotlinLogging
import org.springframework.stereotype.Service

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
