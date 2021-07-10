package orgarif.service.utils

import mu.KotlinLogging
import org.springframework.core.task.TaskExecutor

// TODO[fmk] executorName vs the name of executor thread
class ApplicationTaskExecutor(val taskExecutor: TaskExecutor, val executorName: String) {

    private val logger = KotlinLogging.logger {}

    fun execute(task: () -> Unit) {
        taskExecutor.execute {
            try {
                task()
                // TODO[error] about error handling centralization...
                // but is async here, no message to the user (for example)
                // => it's a branch in error exception handling doc schema
            } catch (e: Throwable) {
                logger.warn(e) { "Uncaught exception in $executorName taskExecutor" }
            }
        }
    }

}