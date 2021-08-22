package orgarif.service.user

import orgarif.command.RegisterCommand
import orgarif.domain.PlainStringPassword
import org.hamcrest.MatcherAssert
import org.hamcrest.Matchers
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class UserServiceCompanionTest {

    val sampleRegisterUserDto = RegisterCommand(
        mail = "  HÉL lo@mytest.net  ",
        password = PlainStringPassword("  password  "),
        displayName = "  display name  "
    )

//    val sampleIdentityDto = IdentityDto("  HÉL lo@mytest.net  ", "  firstname  ", "  lastname  ",
//            "012356789", null)

    @Test
    fun `validate validation ok`() {
        UserService.validateRegisterUserDto(sampleRegisterUserDto)
    }

    @Test
    fun `validate mail validation`() {
        val exceptionThatWasThrown = Assertions.assertThrows(IllegalArgumentException::class.java) {
            UserService.validateRegisterUserDto(sampleRegisterUserDto.copy(mail = ""))
        }
        MatcherAssert.assertThat(exceptionThatWasThrown.message, Matchers.equalTo("Mail is blank"))
    }

    @Test
    fun `validate lastname validation`() {
        val exceptionThatWasThrown = Assertions.assertThrows(IllegalArgumentException::class.java) {
            UserService.validateRegisterUserDto(sampleRegisterUserDto.copy(displayName = ""))
        }
        MatcherAssert.assertThat(exceptionThatWasThrown.message, Matchers.equalTo("Display name is blank"))
    }

    @Test
    fun `clean user register dto`() {
        val (cleanCommand, dirtyMail) = UserService.cleanRegisterUserDto(sampleRegisterUserDto)
        assertEquals("héllo@mytest.net", cleanCommand.mail)
        assertEquals("display name", cleanCommand.displayName)
        assertEquals("HÉL lo@mytest.net", dirtyMail)
    }

//    @Test
//    fun `clean identity dto`() {
//        val dto = UserService.cleanIdentityDto(sampleIdentityDto)
//        Assert.assertEquals("héllo@mytest.net", dto.mail)
//        Assert.assertEquals("lastname", dto.lastname)
//        Assert.assertEquals("firstname", dto.firstname)
//        Assert.assertEquals("HÉL lo@mytest.net", dto.dirtyMail)
//    }

    @Test
    fun `clean several mails`() {
        // nothing changes
        assertEquals("hello@mytest.net" to null, getCleanMailDirtyMailPair("hello@mytest.net"))
        // trim
        assertEquals("hello@mytest.net" to null, getCleanMailDirtyMailPair("  hello@mytest.net  "))
        // space in the middle of the mail
        assertEquals(
            "hello@mytest.net" to "hel lo@mytest.net",
            getCleanMailDirtyMailPair("hel lo@mytest.net")
        )
        // nothing changes (accents)
        assertEquals(
            "héàllo@mytest.net" to null,
            getCleanMailDirtyMailPair("héàllo@mytest.net")
        )
        // lowercase
        assertEquals(
            "héàâôîllo@mytest.net" to "HÉÀÂÔÎLlo@MYTEST.NET",
            getCleanMailDirtyMailPair("HÉÀÂÔÎLlo@MYTEST.NET")
        )
        // all in
        assertEquals(
            "héàâôîllo@mytest.net" to "HÉÀ Â ÔÎLl  o@MYTEST.NET",
            getCleanMailDirtyMailPair("  HÉÀ Â ÔÎLl  o@MYTEST.NET  ")
        )
    }

    private fun getCleanMailDirtyMailPair(mail: String): Pair<String, String?> {
        val (cleanCommand, dirtyMail) = UserService.cleanRegisterUserDto(sampleRegisterUserDto.copy(mail = mail))
        return cleanCommand.mail to dirtyMail
    }

}
