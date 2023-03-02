package orgarif.service.user

import orgarif.service.user.UserService.Companion.cleanMailAndReturnDirty
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class UserServiceCompanionTest {
    @Test
    fun `clean several mails`() {
        // nothing changes
        Assertions.assertEquals(
            "hello@mytest.net" to null, cleanMailAndReturnDirty("hello@mytest.net"))
        // trim is supposed to be done before
        Assertions.assertEquals(
            "hello@mytest.net" to null, cleanMailAndReturnDirty("  hello@mytest.net  "))
        // space in the middle of the mail
        Assertions.assertEquals(
            "hello@mytest.net" to "hel lo@mytest.net", cleanMailAndReturnDirty("hel lo@mytest.net"))
        // nothing changes (accents)
        Assertions.assertEquals(
            "heallo@mytest.net" to "héàllo@mytest.net",
            cleanMailAndReturnDirty("héàllo@mytest.net"))
        // lowercase
        Assertions.assertEquals(
            "heaaoillo@mytest.net" to "HÉÀÂÔÎLlo@MYTEST.NET",
            cleanMailAndReturnDirty("HÉÀÂÔÎLlo@MYTEST.NET"))
        // all in
        Assertions.assertEquals(
            "heaaoillo@mytest.net" to "HÉÀ Â ÔÎLl  o@MYTEST.NET",
            cleanMailAndReturnDirty("  HÉÀ Â ÔÎLl  o@MYTEST.NET  "))
    }
}
