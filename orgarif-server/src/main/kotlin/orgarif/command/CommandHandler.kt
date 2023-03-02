package orgarif.command

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import orgarif.domain.UserSession

interface CommandHandler<C : Command, R : CommandResponse> {
    fun handle(
        command: C,
        userSession: UserSession?,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): R

    abstract class Handler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
        override fun handle(
            command: C,
            userSession: UserSession?,
            request: HttpServletRequest,
            response: HttpServletResponse
        ): R = handle(command)

        abstract fun handle(command: C): R
    }

    abstract class SessionHandler<C : Command, R : CommandResponse> : CommandHandler<C, R> {
        override fun handle(
            command: C,
            userSession: UserSession?,
            request: HttpServletRequest,
            response: HttpServletResponse
        ): R {
            if (userSession == null) {
                throw RuntimeException()
            }
            return handle(command, userSession)
        }

        abstract fun handle(command: C, userSession: UserSession): R
    }
}
