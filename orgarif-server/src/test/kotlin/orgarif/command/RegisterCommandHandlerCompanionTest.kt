package orgarif.command

import org.hamcrest.MatcherAssert
import org.hamcrest.Matchers
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import orgarif.domain.PlainStringPassword

internal class RegisterCommandHandlerCompanionTest {

    val sampleRegisterCommand =
        RegisterCommand(
            mail = "  HÉL lo@mytest.net  ",
            password = PlainStringPassword("  password  "),
            displayName = "  display name  ")

    //    val sampleIdentityDto = IdentityDto("  HÉL lo@mytest.net  ", "  firstname  ", "  lastname
    // ",
    //            "012356789", null)

    @Test
    fun `validate validation ok`() {
        RegisterCommandHandler.validateRegisterCommand(sampleRegisterCommand)
    }

    @Test
    fun `validate mail validation`() {
        val exceptionThatWasThrown =
            Assertions.assertThrows(IllegalArgumentException::class.java) {
                RegisterCommandHandler.validateRegisterCommand(
                    sampleRegisterCommand.copy(mail = " "))
            }
        MatcherAssert.assertThat(exceptionThatWasThrown.message, Matchers.equalTo("Mail is blank"))
    }

    @Test
    fun `validate password validation`() {
        val exceptionThatWasThrown =
            Assertions.assertThrows(IllegalArgumentException::class.java) {
                RegisterCommandHandler.validateRegisterCommand(
                    sampleRegisterCommand.copy(password = PlainStringPassword(" ")))
            }
        MatcherAssert.assertThat(
            exceptionThatWasThrown.message, Matchers.equalTo("Password is blank"))
    }

    @Test
    fun `validate displayName validation`() {
        val exceptionThatWasThrown =
            Assertions.assertThrows(IllegalArgumentException::class.java) {
                RegisterCommandHandler.validateRegisterCommand(
                    sampleRegisterCommand.copy(displayName = " "))
            }
        MatcherAssert.assertThat(
            exceptionThatWasThrown.message, Matchers.equalTo("Display name is blank"))
    }
}
