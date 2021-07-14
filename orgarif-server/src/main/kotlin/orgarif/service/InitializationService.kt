package orgarif.service

import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment
import mu.KotlinLogging

@Service
class InitializationService(
    applicationInstance: ApplicationInstance,
    devInitialDataInjectorService: DevInitialDataInjectorService
) {

    private val logger = KotlinLogging.logger { }

    init {
        if (applicationInstance.env !in listOf(ApplicationEnvironment.dev, ApplicationEnvironment.test)) {
            // [doc] this log is also gonna trigger the deploymentId insertion at startup
            logger.info { "Deployed build \"${applicationInstance.gitRevisionLabel}\", env \"${applicationInstance.env}\", deployment id ${applicationInstance.deploymentId}" }
        }
        if (applicationInstance.env == ApplicationEnvironment.dev) {
            devInitialDataInjectorService.initiateDevUsers()
        }
    }

}