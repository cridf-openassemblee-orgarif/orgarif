package orgarif.config

import orgarif.error.ApplicationExceptionHandlerExceptionResolver
import mu.KotlinLogging
import org.apache.catalina.connector.Request
import org.apache.catalina.connector.Response
import org.apache.catalina.valves.ValveBase
import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.support.GenericConversionService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver

@Configuration
class ApplicationConfiguration {

    val logger = KotlinLogging.logger {}

    @Bean
    fun webMvcRegistrations() =
        object : WebMvcRegistrations {
            override fun getExceptionHandlerExceptionResolver(): ExceptionHandlerExceptionResolver {
                return ApplicationExceptionHandlerExceptionResolver()
            }
        }

    @Bean fun passwordEncoder() = BCryptPasswordEncoder()

    @Bean fun cookieCsrfTokenRepository() = CookieCsrfTokenRepository.withHttpOnlyFalse()

    @Bean
    fun tomcatServletWebServerFactory(): TomcatServletWebServerFactory {
        val factory = TomcatServletWebServerFactory()
        factory.addContextValves(
            object : ValveBase() {
                override fun invoke(request: Request, response: Response) {
                    // because the application is deployed behind a proxy
                    // TODO[tmpl] why Spring seems not to handle it with
                    // server.forward-headers-strategy=framework ?
                    val forwardedProto = request.getHeader("X-Forwarded-Proto")
                    if (forwardedProto != null) {
                        request.isSecure = forwardedProto == "https"
                    }
                    if ("//" in request.request.requestURI) {
                        logger.error {
                            "Request contains double slash and will fail : \"${request.request.requestURI}\""
                        }
                    }
                    getNext().invoke(request, response)
                }
            })
        return factory
    }

    @Bean(name = ["springSessionConversionService"])
    fun sessionConversionService(): GenericConversionService {
        val conversionService = GenericConversionService()
        conversionService.addConverter(
            Any::class.java, ByteArray::class.java, JsonSerializingService())
        conversionService.addConverter(
            ByteArray::class.java, Any::class.java, JsonDeserializingService())
        return conversionService
    }
}
