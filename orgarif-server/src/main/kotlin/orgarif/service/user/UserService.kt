package orgarif.service.user

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.command.RegisterCommand
import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.RegisterAndAuthenticateResult
import orgarif.error.MailAlreadyRegisteredException
import orgarif.repository.UserDao
import orgarif.service.DateService
import orgarif.service.LocaleService
import orgarif.service.NotificationService
import orgarif.service.RandomService
import orgarif.utils.OrgarifStringUtils

@Service
class UserService(
    val userDao: UserDao,
    val localeService: LocaleService,
    val dateService: DateService,
    val randomService: RandomService,
    val userSessionService: UserSessionService,
    val notificationService: NotificationService
) {

    private val logger = KotlinLogging.logger {}

    companion object {
        // [doc] no automatic accent suppression : they're supported by the RFC...
        fun cleanMail(mail: String) =
            mail
                .trim()
                .lowercase()
                .replace(" ", "")
                // TODO [doc] a standard email could contain accents but in practice it's always a
                // user input error
                .let { OrgarifStringUtils.stripAccents(it) }

        // TODO[fmk] those validations should be done in another place too. Also :
        // * should not be longer than 255 chars (because of the database)
        fun validateRegisterUserDto(c: RegisterCommand) {
            if (c.mail.isBlank()) throw IllegalArgumentException("Mail is blank")
            if (c.displayName.isBlank()) throw IllegalArgumentException("Display name is blank")
        }

        fun cleanRegisterUserDto(c: RegisterCommand): Pair<RegisterCommand, String?> {
            val dirtyMail = c.mail.trim()
            val cleanMail = cleanMail(c.mail)
            // do not clone forces to update cleaning =)
            return Pair(
                c.copy(mail = cleanMail, displayName = c.displayName.trim()),
                if (dirtyMail != cleanMail) dirtyMail else null)
        }

        // TODO
        //        fun cleanIdentityDto(dto: IdentityDto): IdentityDto {
        //            val dirtyMail = dto.mail.trim()
        //            val cleanMail = cleanMail(dto.mail)
        //            // do not clone forces to update cleaning =)
        //            return IdentityDto(mail = cleanMail,
        //                    lastname = dto.lastname.trim(),
        //                    firstname = dto.firstname.trim(),
        //                    phoneNumber = dto.phoneNumber,
        //                    dirtyMail = if (dirtyMail != cleanMail) dirtyMail else null)
        //        }

    }

    @Throws(MailAlreadyRegisteredException::class)
    fun createAndAuthenticateUser(
        command: RegisterCommand,
        hashedPassword: HashedPassword,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): RegisterAndAuthenticateResult {
        val (cleanCommand, dirtyMail) = cleanRegisterUserDto(command)
        val locale = localeService.selectLanguage(request.locales)
        val user = createUser(command, hashedPassword, locale, dirtyMail)
        val authResult = userSessionService.authenticateUser(user, request, response)
        notificationService.notify(
            "${user.mail} just suscribed.", NotificationService.Channel.newUser)
        return RegisterAndAuthenticateResult(user, authResult)
    }

    // TODO[user]
    // about the call to apis which could break the db transaction
    @Throws(MailAlreadyRegisteredException::class)
    fun createUser(
        command: RegisterCommand,
        hashedPassword: HashedPassword,
        language: Language,
        dirtyMail: String?
    ): UserDao.Record {
        val user =
            UserDao.Record(
                id = randomService.id(),
                mail = command.mail,
                username = null,
                displayName = command.displayName,
                language = language,
                signupDate = dateService.now(),
                roles = emptySet(),
                dirtyMail = dirtyMail,
                formerMails = emptyList())
        userDao.insert(user, hashedPassword)
        return user
    }

    //    @Throws(MailAlreadyRegisteredException::class)
    //    fun updateIdentity(userSession: UserSession, userId: UserId, dirtyDto: IdentityDto) {
    //        val cleanDto = cleanIdentityDto(dirtyDto)
    //        userDao.updateIdentity(userId,
    //                identityDto.mail,
    //                identityDto.lastname,
    //                identityDto.firstname,
    //                identityDto.phoneNumber,
    //                identityDto.dirtyMail)
    //    }

    //    fun fetchClientUser(userSession: UserSession): UserInfos {
    //        val user = fetchFullUserFromSession(userSession)
    //        return
    //    }

}
