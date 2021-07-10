package orgarif.service.user

import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import orgarif.domain.Session
import orgarif.domain.UserSession
import orgarif.error.AppErrors
import orgarif.error.OrgarifSecurityException

object UserSessionHelper {

    fun isAuthenticated() = SecurityContextHolder.getContext().authentication
        .let { it != null && it !is AnonymousAuthenticationToken && it.isAuthenticated }

    // TODO[secu]
    fun isAdmin(): Boolean {
//        if (!isAuthenticated()) {
//         return false
//        }
//        val userSession = getUserSession()
//        return userSession.admin
        TODO()
    }

    fun assertIsAdmin() {
        if (!isAuthenticated()) {
            // TODO[secu]
            throw OrgarifSecurityException("No session")
        }
        val userSession = getUserSession()
        // TODO[secu]
//        if (!userSession.admin) {
//            throw OrgarifSecurityException("$userSession")
//        }
    }

    fun getUserSession(): UserSession = SecurityContextHolder.getContext().authentication.principal.let {
        when (it) {
            // [doc] allows UserSession object evolution without breaking existing sessions
            is Session -> when (it) {
                is UserSession -> it
//                    is FormerUserSession -> {
//                        logger.info { "Converting UserSession vX-1 to vX $principal" }
//                        updateSession(UserSession(...))
//                    }
            }
            // TODO[secu] do 403 if anonymousUser
            is AnonymousAuthenticationToken ->
                throw AppErrors.NotConnectedUser()
            // TODO[secu] log ?
            else -> {
                throw IllegalStateException("Unknown principal type ${it.javaClass} $it")
            }
        }
    }

}
