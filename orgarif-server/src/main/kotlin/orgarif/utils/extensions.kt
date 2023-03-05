package orgarif.utils

import java.lang.reflect.InvocationTargetException
import java.util.UUID
import orgarif.domain.OrgarifSecurityString
import orgarif.domain.OrgarifStringId
import orgarif.domain.OrgarifUuidId

operator fun StringBuilder.plusAssign(adding: Any) {
    append(adding)
}

operator fun StringBuffer.plusAssign(adding: Any) {
    append(adding)
}

inline fun <reified R : OrgarifSecurityString> String.toSecurityString(): R =
    try {
        R::class.constructors.first().call(this)
    } catch (e: InvocationTargetException) {
        throw e.targetException
    }

inline fun <reified R : OrgarifStringId> String.toTypeId(): R =
    try {
        R::class.constructors.first().call(this)
    } catch (e: InvocationTargetException) {
        throw e.targetException
    }

inline fun <reified R : OrgarifUuidId> UUID.toTypeId(): R =
    try {
        R::class.constructors.first().call(this)
    } catch (e: InvocationTargetException) {
        throw e.targetException
    }

fun String.replaceRecurvice(oldValue: String, newValue: String): String {
    val v = replace(oldValue, newValue)
    if (v == this) {
        return this
    } else {
        return v.replaceRecurvice(oldValue, newValue)
    }
}
