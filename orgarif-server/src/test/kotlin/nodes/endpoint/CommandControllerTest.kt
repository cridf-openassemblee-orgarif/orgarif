package orgarif.endpoint

import orgarif.command.Command
import orgarif.command.LoginCommand
import orgarif.utils.Serializer
import org.junit.Test

internal class CommandControllerTest {

    @Test
    fun command() {
        val json = """
        {
            "objectType":"orgarif.command.LoginCommand",
            "login": "username",
            "password": "password"
        }
        """
        val cmd = Serializer.deserialize<LoginCommand>(json)

        Serializer.deserialize<Command>(json)
    }
}