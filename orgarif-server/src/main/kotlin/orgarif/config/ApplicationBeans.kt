package orgarif.config

import okhttp3.OkHttpClient
import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.context.support.beans
import org.springframework.core.convert.support.GenericConversionService
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler
import org.springframework.session.FindByIndexNameSessionRepository
import org.springframework.session.Session
import org.springframework.session.jdbc.JdbcIndexedSessionRepository
import orgarif.error.ApplicationExceptionHandlerExceptionResolver
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
        bean<BCryptPasswordEncoder>(isPrimary = true)
        bean {
            object : WebMvcRegistrations {
                override fun getExceptionHandlerExceptionResolver() =
                    ApplicationExceptionHandlerExceptionResolver()
            }
        }
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
        bean { TomcatServletWebServerFactory().apply { addContextValves(TomcatValve()) } }
        bean {
            val http = ref<HttpSecurity>()
            http.invoke {
                csrf { csrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse() }
                exceptionHandling {
                    // [doc] disable Spring default login page
                    authenticationEntryPoint = AuthenticationEntryPoint { _, response, _ ->
                        response.sendError(403, "Access Denied")
                    }
                }
                httpBasic { disable() }
                logout {
                    logoutUrl = Routes.logout
                    logoutSuccessHandler = LogoutSuccessHandler { _, response, _ ->
                        response.status = 200
                        response.sendRedirect("/")
                    }
                    permitAll()
                }
                headers {
                    frameOptions {
                        // [doc] forbid connection inside frame
                        disable()
                        // [doc] forbid rendering inside frame
                        deny = true
                    }
                }
                authorizeHttpRequests { authorize(anyRequest, permitAll) }
            }
            http.build()
        }
    }

    override fun initialize(context: GenericApplicationContext) = beans.initialize(context)
}
