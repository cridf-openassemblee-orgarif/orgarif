package orgarif.config

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.DefaultSecurityFilterChain
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import orgarif.domain.Uri

@Configuration
class SecurityConfiguration(
    @Value("\${app.url}") private val appUrl: Uri,
    private val cookieCsrfTokenRepository: CookieCsrfTokenRepository
) {

    val logger = KotlinLogging.logger {}

    @Bean
    fun filterChain(http: HttpSecurity): DefaultSecurityFilterChain {
        http.invoke {
            csrf { csrfTokenRepository = cookieCsrfTokenRepository }
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
                    // [doc] appUrl is used, or else Spring redirects to http
                    response.sendRedirect(appUrl.path)
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
        return http.build()
    }
}
