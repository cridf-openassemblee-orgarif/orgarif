package orgarif.command

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import orgarif.domain.LoginResult
import orgarif.domain.UserInfos
import orgarif.repository.UserDao
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class LoginCommandHandler(
    val userDao: UserDao,
    val userService: UserService,
    val userSessionService: UserSessionService,
    val passwordEncoder: PasswordEncoder
) :
    LoggedOutServletCommandHandler<LoginCommand, LoginCommandResponse>() {

    override fun handle(command: LoginCommand, request: HttpServletRequest, response: HttpServletResponse):
            LoginCommandResponse {
        val cleanLogin = UserService.cleanMail(command.login)
        val user = userDao.fetchByMail(cleanLogin)
            ?: userDao.fetchByUsername(cleanLogin)
            ?: return LoginCommandResponse(LoginResult.USER_NOT_FOUND, null, null)
        val userPassword = userDao.fetchPassword(user.id)
            ?: throw IllegalStateException("${user.id}")
        if (!passwordEncoder.matches(command.password.password.trim(), userPassword.hash)) {
            return LoginCommandResponse(LoginResult.BAD_PASSWORD, null, null)
        }
        val authResult = userSessionService.authenticateUser(user, request, response)
        return LoginCommandResponse(LoginResult.LOGGED_IN, UserInfos.fromUser(user), authResult.csrfToken)
    }

}
