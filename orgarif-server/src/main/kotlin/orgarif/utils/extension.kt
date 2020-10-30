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

@JvmName("toTypeIdNullable")
inline fun <reified R : OrgarifStringId> String?.toTypeId(): R? =
        if (this != null) R::class.constructors.first().call(this)
        else null

inline fun <reified R : OrgarifStringId> String.toTypeId(): R =
        R::class.constructors.first().call(this)

@JvmName("toTypeIdNullable")
inline fun <reified R : OrgarifUuidId> UUID?.toTypeId(): R? =
        if (this != null) R::class.constructors.first().call(this)
        else null

inline fun <reified R : OrgarifUuidId> UUID.toTypeId(): R =
        R::class.constructors.first().call(this)

