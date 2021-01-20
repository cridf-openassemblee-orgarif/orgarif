package orgarif.config

import okhttp3.OkHttpClient
import org.jooq.DSLContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.core.task.TaskExecutor
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import orgarif.service.utils.ApplicationTaskExecutor
import orgarif.utils.Serializer

@Configuration
class ApplicationBeans {

    // [doc] with mysql, without that line jooq tries to operate on the database (=schema on mysql)
    // used to generate the jooq code
    @Autowired
    fun configureJooq(jooq: DSLContext) = jooq.configuration().settings().withRenderSchema(false)

    @Bean
    @Primary
    fun jackson() = Serializer.objectMapper

    @Bean
    fun okHttpClient() = OkHttpClient()

    @Bean
    fun taskExecutor(): TaskExecutor {
        val executor = ThreadPoolTaskExecutor()
        executor.corePoolSize = 20
        executor.maxPoolSize = 20
        executor.setQueueCapacity(500)
        executor.setThreadNamePrefix("TaskExecutor-")
        executor.initialize()
        return executor
    }

    @Bean
    fun applicationTaskExecutor(@Suppress("DEPRECATION") taskExecutor: TaskExecutor) =
        ApplicationTaskExecutor(taskExecutor, "main-executor")

}
