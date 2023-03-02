package orgarif.service.utils

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment

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
