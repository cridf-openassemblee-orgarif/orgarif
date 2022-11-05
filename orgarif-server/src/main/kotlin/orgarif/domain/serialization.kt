package orgarif.domain

// FIXME[fmk] test unicity ?
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
internal annotation class Prefix(val value: String)

open class SerializeAsString(open val value: String)
