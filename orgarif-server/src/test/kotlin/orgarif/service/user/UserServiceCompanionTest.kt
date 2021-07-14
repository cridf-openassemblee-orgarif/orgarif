package orgarif.service.user

import orgarif.command.RegisterCommand
import orgarif.domain.PlainStringPassword
import org.junit.Assert
import org.junit.Rule
import org.junit.Test
import org.junit.rules.ExpectedException

internal class UserServiceCompanionTest {

    val sampleRegisterUserDto = RegisterCommand(
        mail = "  HÉL lo@mytest.net  ",
        password = PlainStringPassword("  password  "),
        displayName = "  display name  "
    )

//    val sampleIdentityDto = IdentityDto("  HÉL lo@mytest.net  ", "  firstname  ", "  lastname  ",
//            "012356789", null)

    @Rule
    @JvmField
    val expectedException = ExpectedException.none()

    @Test
    fun `validate validation ok`() {
        UserService.validateRegisterUserDto(sampleRegisterUserDto)
    }

    @Test
    fun `validate mail validation`() {
        expectedException.expect(IllegalArgumentException::class.java)
        expectedException.expectMessage("Mail is blank")
        UserService.validateRegisterUserDto(sampleRegisterUserDto.copy(mail = ""))
    }

    @Test
    fun `validate lastname validation`() {
        expectedException.expect(IllegalArgumentException::class.java)
        expectedException.expectMessage("Display name is blank")
        UserService.validateRegisterUserDto(sampleRegisterUserDto.copy(displayName = ""))
    }

    @Test
    fun `clean user register dto`() {
        val (cleanCommand, dirtyMail) = UserService.cleanRegisterUserDto(sampleRegisterUserDto)
        Assert.assertEquals("héllo@mytest.net", cleanCommand.mail)
        Assert.assertEquals("display name", cleanCommand.displayName)
        Assert.assertEquals("HÉL lo@mytest.net", dirtyMail)
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
        Assert.assertEquals("hello@mytest.net" to null, getCleanMailDirtyMailPair("hello@mytest.net"))
        // trim
        Assert.assertEquals("hello@mytest.net" to null, getCleanMailDirtyMailPair("  hello@mytest.net  "))
        // space in the middle of the mail
        Assert.assertEquals(
            "hello@mytest.net" to "hel lo@mytest.net",
            getCleanMailDirtyMailPair("hel lo@mytest.net")
        )
        // nothing changes (accents)
        Assert.assertEquals(
            "héàllo@mytest.net" to null,
            getCleanMailDirtyMailPair("héàllo@mytest.net")
        )
        // lowercase
        Assert.assertEquals(
            "héàâôîllo@mytest.net" to "HÉÀÂÔÎLlo@MYTEST.NET",
            getCleanMailDirtyMailPair("HÉÀÂÔÎLlo@MYTEST.NET")
        )
        // all in
        Assert.assertEquals(
            "héàâôîllo@mytest.net" to "HÉÀ Â ÔÎLl  o@MYTEST.NET",
            getCleanMailDirtyMailPair("  HÉÀ Â ÔÎLl  o@MYTEST.NET  ")
        )
    }

    private fun getCleanMailDirtyMailPair(mail: String): Pair<String, String?> {
        val (cleanCommand, dirtyMail) = UserService.cleanRegisterUserDto(sampleRegisterUserDto.copy(mail = mail))
        return cleanCommand.mail to dirtyMail
    }

}
