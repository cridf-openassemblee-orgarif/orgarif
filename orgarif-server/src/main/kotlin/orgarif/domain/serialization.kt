package orgarif.domain

import org.apache.commons.lang3.exception.ExceptionUtils

// FIXMENOW test unicity ?
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
internal annotation class Prefix(val value: String)

open class SerializeAsString(open val value: String)

data class ReadableStackTrace(val exception: Throwable) {
    fun toReadableString(): String = ExceptionUtils.getStackTrace(exception)
}
