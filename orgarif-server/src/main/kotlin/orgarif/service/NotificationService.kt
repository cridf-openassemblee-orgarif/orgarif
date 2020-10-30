package orgarif.service

import mu.KotlinLogging
import orgarif.domain.ApplicationEnvironment
import orgarif.service.utils.ApplicationTaskExecutor
import org.springframework.stereotype.Service

@Service
class NotificationService(val applicationInstance: ApplicationInstance,
                          val taskExecutor: ApplicationTaskExecutor,
                          val httpService: HttpService) {

    private val logger = KotlinLogging.logger {}

    enum class Channel {
        NEW_USER,
        INFO,
    }

    fun notify(message: String, channel: Channel) {
        if (applicationInstance.env == ApplicationEnvironment.prod) {
            taskExecutor.execute {
            }
        } else {
            logger.info { "[${channel.name}] $message" }
        }
    }

}
