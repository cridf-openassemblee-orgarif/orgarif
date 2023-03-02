package orgarif.command

import orgarif.domain.LoginResult
import orgarif.domain.UserInfos
import orgarif.domain.UserSession
import orgarif.repository.user.UserDao
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.stereotype.Service

@Service
class LoginCommandHandler(
    val userDao: UserDao,
    val userService: UserService,
    val userSessionService: UserSessionService
) : CommandHandler<LoginCommand, LoginCommandResponse> {

    override fun handle(
        command: LoginCommand,
        userSession: UserSession?,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): LoginCommandResponse {
        if (userSession != null) {
            // FIXME[tmpl] can't find the wooord
            // OrgarifCommonException
            // OrgarifStandardException
            throw RuntimeException()
        }
        val cleanMail = UserService.cleanMail(command.mail)
        val user =
            userDao.fetchOrNullByMail(cleanMail)
                ?: return LoginCommandResponse(LoginResult.mailNotFound, null)
        val userPassword = userDao.fetchPassword(user.id)
        if (!userService.passwordMatches(command.password, userPassword)) {
            return LoginCommandResponse(LoginResult.badPassword, null)
        }
        userSessionService.authenticateUser(user, request, response)
        return LoginCommandResponse(LoginResult.loggedIn, UserInfos.fromUser(user))
    }
}
