package orgarif.error

import org.apache.commons.lang3.exception.ExceptionUtils
import org.slf4j.event.Level
import orgarif.domain.OrgarifId
import orgarif.domain.RequestErrorId
import java.time.Instant

// FIXME can remove ? ReadableStackTrace ? and ReadableStackTraceSerializer ?
data class RequestError(
    val id: RequestErrorId,
    val status: Int,
    val error: String,
    val message: String,
    val instant: Instant,
    val stackTrace: ReadableStackTrace?
)

data class ReadableStackTrace(val exception: Throwable?) {
    fun toReadableString(): String? = if (exception != null) ExceptionUtils.getStackTrace(exception) else null
}

// TODO[error] display ? silent ? mute ?
//class DisplayMessageException(displayMessage: String, logMessage: String) : Exception(message)
// user message exception
class DisplayMessageException(val displayMessage: String, val logMessage: String, val logLevel: Level) :
    Exception(logMessage)

// [doc] contains mail to be clear on the front ? Not really needed it smartly handled on the front ?
class MailAlreadyRegisteredException(mail: String) : Exception()
class ItemIdNotFoundException(val id: OrgarifId<*>) : Exception()
class ItemNotFoundException(val itemClass: Class<*>, val reference: String) : Exception()
class OrgarifNotFoundException : Exception()
class OrgarifSerializationLocalDateException(val date: String) : Exception()

// TODO[error] always use runtime ? because of kt
class MessageNotSentException(message: String) : RuntimeException(message)
class OrgarifSecurityException(message: String) : Exception(message)
class UserLoggedOutException : Exception()
