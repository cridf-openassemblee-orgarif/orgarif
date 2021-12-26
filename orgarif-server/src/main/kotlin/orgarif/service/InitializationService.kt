package orgarif.service

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment

@Service
class InitializationService(
    applicationInstance: ApplicationInstance,
    devInitialDataInjectorService: DevInitialDataInjectorService
) {

    private val logger = KotlinLogging.logger {}

    init {
        if (applicationInstance.env !in
            setOf(ApplicationEnvironment.dev, ApplicationEnvironment.test)) {
            // [doc] this log is also gonna trigger the deploymentId insertion at startup
            logger.info {
                "Deployed build \"${applicationInstance.gitRevisionLabel}\", env \"${applicationInstance.env}\", deployment id ${applicationInstance.deploymentId}"
            }
        }
        if (applicationInstance.env == ApplicationEnvironment.dev) {
            devInitialDataInjectorService.initiateDevUsers()
        }
    }
}
