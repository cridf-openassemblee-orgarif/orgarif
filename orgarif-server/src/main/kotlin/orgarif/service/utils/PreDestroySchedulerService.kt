package orgarif.service.utils

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.service.ApplicationInstance
import javax.annotation.PreDestroy

@Service
class PreDestroySchedulerService(val applicationInstance: ApplicationInstance) {

    private val logger = KotlinLogging.logger {}

    @PreDestroy
    fun preDestroy() {
        logger.info { "Process predestroy tasks" }
        applicationInstance.setShutdownTime()
        logger.info { "Predestroy OK" }
    }

}