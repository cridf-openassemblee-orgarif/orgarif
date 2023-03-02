package orgarif.domain

// FIXME[tmpl] test unicity ?
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
internal annotation class Prefix(val value: String)

class SerializeAsString(open val value: String)
