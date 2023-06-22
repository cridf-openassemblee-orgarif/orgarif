package orgarif.controller

import org.junit.jupiter.api.Test
import orgarif.command.Command
import orgarif.command.LoginCommand
import orgarif.serialization.Serializer

internal class CommandControllerTest {

    @Test
    fun command() {
        val json =
            """
        {
            "objectType":"LoginCommand",
            "mail": "username",
            "password": "password"
        }
        """
        Serializer.deserialize<LoginCommand>(json)
        Serializer.deserialize<Command>(json)
    }
}
