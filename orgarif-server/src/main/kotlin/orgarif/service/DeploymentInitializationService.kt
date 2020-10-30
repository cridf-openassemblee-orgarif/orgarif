package orgarif.service

import orgarif.domain.ApplicationEnvironment
import org.springframework.stereotype.Service

@Service
class DeploymentInitializationService(val applicationInstance: ApplicationInstance,
                                      val devDataInjectorService: DevDataInjectorService) {

    init {
        if (applicationInstance.env == ApplicationEnvironment.dev) {
            devDataInjectorService.initiateDevUsers()
        }
    }

}