package orgarif.domain

import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.fasterxml.jackson.annotation.JsonTypeName
import orgarif.repository.user.UserDao

enum class Language {
    En,
    Test
}

enum class Role {
    User,
    Admin
}

enum class AuthLogType {
    DirtyMail,
    FormerMail
}

data class UserInfos(
    val id: UserId,
    val mail: String,
    val displayName: String,
    //    val zoneId: ZoneId,
    val roles: Set<Role>
) {
    companion object {
        fun fromUser(user: UserDao.Record) =
            UserInfos(
                user.id,
                user.mail,
                user.displayName,
                //            user.zoneId,
                user.roles)
    }
}

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "objectType")
sealed class Session

// [doc] to update :
// UserSessionHelper.authenticateUser
// UserSessionHelper.getUserSession (should fail)
// TODO[tmpl] check this method
/**
 * To update UserSession :
 * @JsonTypeName("UserSession-vX") data class FormerUserSession(..)
 * @JsonTypeName("UserSession-vX+1") data class UserSession(..) Convert former into new session in
 * [UserSessionHelper]
 */
@JsonTypeName("UserSession-v0")
data class UserSession(val sessionId: UserSessionId, val userId: UserId, val roles: Set<Role>) :
    Session() {
    // [doc] for logback and spring sessions
    override fun toString() = "[$sessionId|$userId]"
}

enum class LoginResult {
    LoggedIn,
    MailNotFound,
    BadPassword
}

enum class RegisterResult {
    Registered,
    MailAlreadyExists
}

enum class UpdateIdentityResult {
    Updated,
    MailAlreadyExists
}

enum class SendLostPasswordMailResponse {
    UnknownLogin,
    Ok
}
