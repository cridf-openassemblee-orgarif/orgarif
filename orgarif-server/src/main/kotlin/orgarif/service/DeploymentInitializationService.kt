package orgarif.service

import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment

@Service
class DeploymentInitializationService(
    val applicationInstance: ApplicationInstance,
    val devInitialDataInjectorService: DevInitialDataInjectorService
) {

    init {
        if (applicationInstance.env == ApplicationEnvironment.dev) {
            devInitialDataInjectorService.initiateDevUsers()
        }
    }

}