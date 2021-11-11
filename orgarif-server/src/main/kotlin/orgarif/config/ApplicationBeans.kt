package orgarif.config

import orgarif.service.IdLogService
import orgarif.service.RandomService
import orgarif.service.utils.ApplicationTaskExecutor
import orgarif.utils.Serializer
import okhttp3.OkHttpClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.core.task.TaskExecutor
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor

@Configuration
class ApplicationBeans {

    @Bean
    @Primary
    fun jackson() = Serializer.objectMapper

    @Bean
    fun okHttpClient() = OkHttpClient()

    @Bean
    fun idLogService() = IdLogService()

    @Bean
    fun randomService(idLogService: IdLogService) = RandomService(idLogService)

    @Bean
    fun taskExecutor(): TaskExecutor {
        val executor = ThreadPoolTaskExecutor()
        executor.corePoolSize = 20
        executor.maxPoolSize = 20
        executor.setQueueCapacity(500)
        executor.threadNamePrefix = "TaskExecutor-"
        executor.initialize()
        return executor
    }

    @Bean
    fun applicationTaskExecutor(@Suppress("DEPRECATION") taskExecutor: TaskExecutor) =
        ApplicationTaskExecutor(taskExecutor, "main-executor")

}
