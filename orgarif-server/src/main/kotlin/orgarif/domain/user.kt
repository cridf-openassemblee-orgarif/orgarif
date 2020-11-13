package orgarif.domain

import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.fasterxml.jackson.annotation.JsonTypeName
import orgarif.repository.sql.UserDao
import orgarif.utils.OrgarifStringUtils.filteredPassword
import orgarif.utils.OrgarifStringUtils.serializeUuid

enum class Language {
    en, test
}

data class UserInfos(val id: UserId,
                     val mail: String,
        // [doc] is null if false, so "admin" field won't be obviously serialized for common users
        // TODO[secu] test
                     val admin: Boolean?) {
    companion object {
        fun fromUser(user: UserDao.Record) = UserInfos(user.id, user.mail, if (user.admin) true else null)
    }
}

enum class AuthenticationLevel {
    neutral, loggedIn, loggedOut, admin
}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Session

// TODO[doc] to update :
// UserSessionHelper.authenticateUser
// UserSessionHelper.getUserSession (devrait péter)
// TODO[fmk] check cette méthode
/**
 * To update UserSession :
 * @JsonTypeName("UserSession-vX")
 * data class FormerUserSession(..)
 * @JsonTypeName("UserSession-vX+1")
 * data class UserSession(..)
 * Convert former into new session in [UserSessionHelper]
 */
@JsonTypeName("UserSession-v0")
data class UserSession(val sessionId: UserSessionId,
                       val userId: UserId) : Session() {
    // [doc] for logback and spring sessions
    override fun toString() = "[${serializeUuid(userId.rawId)}|${serializeUuid(sessionId.rawId)}]"
}

data class AuthResult(val userSession: UserSession,
                      val csrfToken: String)

enum class LoginResult {
    LOGGED_IN, USER_NOT_FOUND, BAD_PASSWORD
}

enum class RegisterResult {
    REGISTERED, MAIL_ALREADY_EXISTS
}

enum class UpdateIdentityResult {
    UPDATED, MAIL_ALREADY_EXISTS
}

data class RegisterAndAuthenticateResult(val user: UserDao.Record, val authResult: AuthResult)

enum class SendLostPasswordMailResponse {
    UNKNOWN_LOGIN, OK
}

// TODO[secu] check no pwd in logs, db... test ?
data class PlainStringPassword(val password: String) {
    override fun toString() = "Password($filteredPassword)"
}

data class HashedPassword(val hash: String) {
    // [doc] even it's a hash, there's no reason to print it clean anywhere
    override fun toString() = "HashedPassword($filteredPassword)"
}
