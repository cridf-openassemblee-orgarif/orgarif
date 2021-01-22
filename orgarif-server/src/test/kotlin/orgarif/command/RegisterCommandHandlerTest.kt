package orgarif.command

import org.junit.Rule
import org.junit.Test
import org.junit.rules.ExpectedException

internal class RegisterCommandHandlerTest {

    @Rule
    @JvmField
    val expectedException = ExpectedException.none()

    @Test
    fun `validate blank password validation`() {
        expectedException.expect(IllegalArgumentException::class.java)
        expectedException.expectMessage("Password is blank")
        RegisterCommandHandler.validatePassword(" ")
    }

    @Test
    fun `validate tab password validation`() {
        expectedException.expect(IllegalArgumentException::class.java)
        expectedException.expectMessage("Password is blank")
        RegisterCommandHandler.validatePassword("\t")
    }

}
