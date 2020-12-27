package orgarif.utils

import orgarif.domain.OrgarifStringId
import orgarif.domain.OrgarifUuidId
import java.util.*

val Any?.forceExhaustiveWhen get() = Unit

operator fun StringBuilder.plusAssign(adding: Any) {
    append(adding)
}

operator fun StringBuffer.plusAssign(adding: Any) {
    append(adding)
}

inline fun <reified R : OrgarifStringId> String.toTypeId(): R =
        R::class.constructors.first().call(this)

inline fun <reified R : OrgarifUuidId> UUID.toTypeId(): R =
        R::class.constructors.first().call(this)

