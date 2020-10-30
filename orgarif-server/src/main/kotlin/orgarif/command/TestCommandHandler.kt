package orgarif.command

import orgarif.domain.UserSession
import org.springframework.stereotype.Service

@Service
class TestCommandHandler :
        LoggedInCommandHandler<TestCommand, EmptyCommandResponse>() {

    override fun handle(command: TestCommand, userSession: UserSession): EmptyCommandResponse {
        return EmptyCommandResponse
    }

}
