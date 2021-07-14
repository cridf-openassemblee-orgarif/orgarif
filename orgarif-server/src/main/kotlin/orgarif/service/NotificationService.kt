package orgarif.service

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment
import orgarif.service.utils.ApplicationTaskExecutor

@Service
class NotificationService(
    val applicationInstance: ApplicationInstance,
    val taskExecutor: ApplicationTaskExecutor,
    val httpService: HttpService
) {

    private val logger = KotlinLogging.logger {}

    enum class Channel {
        newUser,
        info,
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
