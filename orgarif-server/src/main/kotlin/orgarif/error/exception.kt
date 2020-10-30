package orgarif.error

import orgarif.domain.OrgarifId
import orgarif.domain.RequestErrorId
import org.apache.commons.lang3.exception.ExceptionUtils
import org.slf4j.event.Level
import java.time.Instant

data class RequestError(val id: RequestErrorId,
                        val status: Int,
                        val error: String,
                        val message: String,
                        val instant: Instant,
                        val stackTrace: ReadableStackTrace?)

data class ReadableStackTrace(val exception: Throwable?) {
    fun toReadableString(): String? = if (exception != null) ExceptionUtils.getStackTrace(exception) else null
}

// TODO[error] display ? silent ? mute ?
//class DisplayMessageException(displayMessage: String, logMessage: String) : Exception(message)
// user message exception
class DisplayMessageException(val displayMessage: String, val logMessage: String, val logLevel: Level) :
        Exception(logMessage)

// [doc] contient mail pour ne pas créer d'affichage confusant (user peut avoir modifié son mail)
class MailAlreadyRegisteredException(mail: String) : Exception()
class ItemIdNotFoundException(val id: OrgarifId<*>) : Exception()
class ItemNotFoundException(val itemClass: Class<*>, val reference: String) : Exception()

// TODO[error] tjs utiliser des runtime donc ? a cause de kt
class MessageNotSentException(message: String) : RuntimeException(message)
class OrgarifSecurityException(message: String) : Exception(message)
class UserLoggedOutException() : Exception()
