package orgarif.service

import orgarif.domain.ApplicationEnvironment
import orgarif.service.utils.ApplicationTaskExecutor
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class NotificationService(val taskExecutor: ApplicationTaskExecutor, val httpService: HttpService) {

    private val logger = KotlinLogging.logger {}

    enum class Channel {
        newUser,
        info,
    }

    fun notify(message: String, channel: Channel) {
        if (ApplicationInstance.env == ApplicationEnvironment.prod) {
            taskExecutor.execute {}
        } else {
            logger.info { "[${channel.name}] $message" }
        }
    }
}
