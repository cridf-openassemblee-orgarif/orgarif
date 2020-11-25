package orgarif.config

import orgarif.controller.IndexController.Companion.loginRoute
import orgarif.controller.IndexController.Companion.logoutRoute
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository

@Configuration
@EnableWebSecurity
class SecurityConfiguration(@Value("\${forceHttps}") val forceHttps: Boolean,
                            @Value("\${app.url}") val appUrl: String,
                            val cookieCsrfTokenRepository: CookieCsrfTokenRepository) : WebSecurityConfigurerAdapter() {

    override fun configure(web: WebSecurity) {
        // TODO[fmk] est necessaire en fait ??
        // "/**/*" match "/*" ou pas ?
        web.ignoring()
                .antMatchers(ApplicationConstants.staticResourcesPath + "/*")
                .antMatchers(ApplicationConstants.staticResourcesPath + "/**/*")
    }

    override fun configure(http: HttpSecurity) {
        if (forceHttps) {
            http.requiresChannel().anyRequest().requiresSecure()
        }
        with(http) {
            with(csrf()) {
                csrfTokenRepository(cookieCsrfTokenRepository)
            }
            with(exceptionHandling()) {
                // [doc] sans ça Spring balance son login form tout dégueu
                authenticationEntryPoint { _, response, _ -> response.sendError(403, "Access Denied") }
            }
            with(logout()) {
                logoutUrl(logoutRoute)
                logoutSuccessHandler { _, response, _ ->
                    response.status = 200
                    // [doc] appUrl is used, or else Spring redirects to http
                    response.sendRedirect(appUrl + loginRoute)
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
