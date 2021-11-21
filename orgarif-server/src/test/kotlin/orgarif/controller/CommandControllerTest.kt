package orgarif.controller

import orgarif.command.Command
import orgarif.command.LoginCommand
import orgarif.serialization.Serializer
import org.junit.jupiter.api.Test

internal class CommandEndpointTest {

    @Test
    fun command() {
        val json = """
        {
            "objectType":"LoginCommand",
            "login": "username",
            "password": "password"
        }
        """
        val cmd = Serializer.deserialize<LoginCommand>(json)

        Serializer.deserialize<Command>(json)
    }
}