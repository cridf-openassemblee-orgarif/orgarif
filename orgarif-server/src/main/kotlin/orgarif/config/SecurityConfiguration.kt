package orgarif.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import orgarif.controller.RemoteController

@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    @Value("\${app.url}") val appUrl: String,
    val cookieCsrfTokenRepository: CookieCsrfTokenRepository
) : WebSecurityConfigurerAdapter() {

    override fun configure(web: WebSecurity) {
        // TODO[fmk] is needed ?
        // & does "/**/*" actually match "/*" ?
        web.ignoring()
            .antMatchers(ApplicationConstants.resourcesPath + "/*")
            .antMatchers(ApplicationConstants.resourcesPath + "/**/*")
            .antMatchers(RemoteController.remoteRoute + "/*")
            .antMatchers(RemoteController.remoteRoute + "/**/*")
    }

    override fun configure(http: HttpSecurity) {
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
                    response.sendRedirect(appUrl + Routes.login)
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
        }
    }
}
