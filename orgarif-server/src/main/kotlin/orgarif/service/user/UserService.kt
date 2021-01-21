package orgarif.service.user

import mu.KotlinLogging
import org.springframework.stereotype.Service
import orgarif.command.RegisterCommand
import orgarif.domain.HashedPassword
import orgarif.domain.Language
import orgarif.domain.RegisterAndAuthenticateResult
import orgarif.domain.UserId
import orgarif.error.MailAlreadyRegisteredException
import orgarif.repository.sql.UserDao
import orgarif.service.DateService
import orgarif.service.LocaleService
import orgarif.service.NotificationService
import orgarif.service.RandomService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

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
        // pas de suppression des accents qui sont supportés par la RFC...
        fun cleanMail(mail: String) = mail
            .trim()
            .toLowerCase()
            .replace(" ", "")

        // TODO[fmk] ces validations vont ailleurs aussi. Also :
        // * ne doivent pas dépasser les 255 chars de la db
        fun validateRegisterUserDto(c: RegisterCommand) {
            if (c.mail.isBlank()) throw IllegalArgumentException("Mail is blank")
        }

        fun cleanRegisterUserDto(c: RegisterCommand): Pair<RegisterCommand, String?> {
            val dirtyMail = c.mail.trim()
            val cleanMail = cleanMail(c.mail)
            // do not clone forces to update cleaning =)
            return Pair(
                c.copy(
                    mail = cleanMail
                ),
                if (dirtyMail != cleanMail) dirtyMail else null
            )
        }

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
            "${user.mail} just suscribed.",
            NotificationService.Channel.NEW_USER
        )
        return RegisterAndAuthenticateResult(user, authResult)
    }

    // TODO[user]
    // question des services tiers qui peuvent faire péter transaction
    @Throws(MailAlreadyRegisteredException::class)
    fun createUser(
        command: RegisterCommand,
        hashedPassword: HashedPassword,
        language: Language,
        dirtyMail: String?
    ): UserDao.Record {
        val user = UserDao.Record(
            id = randomService.id(),
            mail = command.mail,
            username = null,
            language = language,
            signupDate = dateService.now(),
            admin = false,
            dirtyMail = dirtyMail
        )
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
