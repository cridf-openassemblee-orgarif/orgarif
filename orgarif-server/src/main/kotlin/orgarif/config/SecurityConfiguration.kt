package orgarif.config

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.SpringVersion
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer
import org.springframework.security.core.SpringSecurityCoreVersion
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import orgarif.controller.RemoteController
import orgarif.domain.Uri

@Configuration
class SecurityConfiguration(
    @Value("\${app.url}") private val appUrl: Uri,
    private val cookieCsrfTokenRepository: CookieCsrfTokenRepository
) {

    val logger = KotlinLogging.logger {}

    companion object {
        const val expectedSpringVersion = "5.3.21"
        const val expectedSpringSecurityVersion = "5.7.2"
    }

    init {
        if (SpringVersion.getVersion() != expectedSpringVersion ||
            SpringSecurityCoreVersion.getVersion() != expectedSpringSecurityVersion) {
            // [doc][d8bc54] Spring advises not to use ignoring().antMatchers for security
            // configuration
            // https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
            // https://github.com/spring-projects/spring-security/issues/10938
            // but i didn't manage to make work the suggestion in the issue:
            //    @Bean
            //    @Order(0)
            //    fun resources(http: HttpSecurity) =
            //        with(http) {
            //            requestMatchers { it.antMatchers("/remote/**") }
            //                .authorizeHttpRequests { it.anyRequest().permitAll() }
            //                .requestCache()
            //                .disable()
            //                .securityContext()
            //                .disable()
            //                .sessionManagement()
            //                .disable()
            //            build()
            //        }
            // and I couldn't manage to make remote endpoints with:
            // with(authorizeRequests()) {
            //     antMatchers(RemoteController.remoteRoute + "/**").permitAll()
            // }
            // We don't want Spring Security at all for some endpoints
            // => Spring WebSecurity logger boring warns can be disabled in logback
            // BUT:
            // * verify about this configuration when Spring Security is updated
            // (see https://github.com/spring-projects/spring-security/issues/10913 among others...)
            // * verify no other important warn logs could be hidden by the logback conf
            logger.warn {
                "Spring and/or Spring Security have been updated => check configuration ! (actual: " +
                    "${SpringVersion.getVersion()} / ${SpringSecurityCoreVersion.getVersion()}, expected: " +
                    "$expectedSpringVersion / $expectedSpringSecurityVersion)"
            }
        }
    }

    @Bean
    fun filterChain(http: HttpSecurity) =
        with(http) {
            with(csrf()) { csrfTokenRepository(cookieCsrfTokenRepository) }
            with(exceptionHandling()) {
                // [doc] without it Spring sends its own login page !
                authenticationEntryPoint { _, response, _ ->
                    response.sendError(403, "Access Denied")
                }
            }
            with(logout()) {
                logoutUrl(Routes.logout)
                logoutSuccessHandler { _, response, _ ->
                    response.status = 200
                    // [doc] appUrl is used, or else Spring redirects to http
                    response.sendRedirect(appUrl.path)
                }
                permitAll()
            }
            with(headers()) {
                with(frameOptions()) {
                    // [doc] forbid connection inside frame
                    disable()
                    // [doc] forbid rendering inside frame
                    deny()
                }
            }
            authorizeRequests()
            build()
        }

    @Bean
    fun ignoreEndpoints() = WebSecurityCustomizer {
        it.ignoring()
            .antMatchers(
                ApplicationConstants.resourcesPath + "/**",
                RemoteController.remoteRoute + "/**",
            )
    }
}
