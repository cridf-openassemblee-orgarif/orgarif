package orgarif.service.utils

import mu.KotlinLogging
import org.springframework.core.task.TaskExecutor

// TODO[fmk] executorName vs le nom du thread d'executor
class ApplicationTaskExecutor(val taskExecutor: TaskExecutor, val executorName: String) {

    private val logger = KotlinLogging.logger {}

    fun execute(task: () -> Unit) {
        taskExecutor.execute {
            try {
                task()
                // TODO[error] de l'intérêt d'isoler la gestion des erreurs
                // sauf que là async, donc pas de mess à l'user par ex
                // une branch dans mes schemas, ça...
            } catch (e: Throwable) {
                logger.warn(e) { "Uncaught exception in $executorName taskExecutor" }
            }
        }
    }

}