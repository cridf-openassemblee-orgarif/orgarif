package orgarif.service.utils

import orgarif.domain.ApplicationEnvironment
import mu.KotlinLogging
import org.springframework.stereotype.Service

@Service
class NotificationService(
    private val taskExecutor: ApplicationTaskExecutor,
    val httpService: HttpService
) {

    private val logger = KotlinLogging.logger {}

    enum class Channel {
        NewUser,
        Info,
    }

    fun notify(message: String, channel: Channel) {
        if (ApplicationInstance.env == ApplicationEnvironment.Prod) {
            taskExecutor.execute {}
        } else {
            logger.info { "[${channel.name}] $message" }
        }
    }
}
