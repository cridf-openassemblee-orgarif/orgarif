package orgarif.command

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

internal class RegisterCommandHandlerTest {

    @Test
    fun `validate blank password validation`() {
        val exceptionThatWasThrown =
            Assertions.assertThrows(IllegalArgumentException::class.java) {
                RegisterCommandHandler.validatePassword(" ")
            }
        assertThat(exceptionThatWasThrown.message, equalTo("Password is blank"))
    }

    @Test
    fun `validate tab password validation`() {
        val exceptionThatWasThrown =
            Assertions.assertThrows(IllegalArgumentException::class.java) {
                RegisterCommandHandler.validatePassword("\t")
            }
        assertThat(exceptionThatWasThrown.message, equalTo("Password is blank"))
    }
}
