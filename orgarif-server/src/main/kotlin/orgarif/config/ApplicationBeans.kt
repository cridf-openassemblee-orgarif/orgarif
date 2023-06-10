package orgarif.config

import okhttp3.OkHttpClient
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.context.support.beans
import org.springframework.core.convert.support.GenericConversionService
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler
import org.springframework.session.FindByIndexNameSessionRepository
import org.springframework.session.Session
import org.springframework.session.jdbc.JdbcIndexedSessionRepository
import orgarif.serialization.Serializer
import orgarif.service.utils.ApplicationTaskExecutor
import orgarif.service.utils.random.IdLogService
import orgarif.service.utils.random.RandomService

class ApplicationBeans : ApplicationContextInitializer<GenericApplicationContext> {

    val beans = beans {
        bean(isPrimary = true) { Serializer.objectMapper }
        bean<OkHttpClient>()
        bean<IdLogService>()
        bean { RandomService(ref()) }
        bean {
            ThreadPoolTaskExecutor().apply {
                corePoolSize = 20
                maxPoolSize = 20
                queueCapacity = 500
                threadNamePrefix = "TaskExecutor-"
                initialize()
            }
        }
        bean { ApplicationTaskExecutor(ref(), "main-executor") }
        bean<CookieCsrfTokenRepository>()
        bean<HttpSessionSecurityContextRepository>()
        bean<XorCsrfTokenRequestAttributeHandler>()
        bean(isPrimary = true) {
            SafeSessionRepository(
                JdbcIndexedSessionRepository(ref(), ref())
                    .apply {
                        setConversionService(
                            GenericConversionService().apply {
                                addConverter(
                                    Any::class.java,
                                    ByteArray::class.java,
                                    JsonSerializingService())
                                addConverter(
                                    ByteArray::class.java,
                                    Any::class.java,
                                    JsonDeserializingService())
                            })
                    }
                    .let {
                        @Suppress("UNCHECKED_CAST")
                        it as FindByIndexNameSessionRepository<Session>
                    })
        }
    }

    override fun initialize(context: GenericApplicationContext) = beans.initialize(context)
}
