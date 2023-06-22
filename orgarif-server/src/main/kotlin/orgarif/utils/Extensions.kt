package orgarif.utils

import java.lang.reflect.InvocationTargetException
import java.util.UUID
import kotlin.reflect.full.starProjectedType
import orgarif.domain.OrgarifId
import orgarif.domain.OrgarifSecurityString
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

// "cache" because is not instantaneous
val OrgarifUuidIdStarProjectedType = OrgarifUuidId::class.starProjectedType

inline fun <reified R : OrgarifId<*>> String.toTypeId(): R =
    try {
        if (OrgarifUuidIdStarProjectedType in R::class.supertypes) {
            R::class.constructors.first().call(this.uuid())
        } else {
            R::class.constructors.first().call(this)
        }
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

// UUID(29d902e1-c234-4e54-b305-8b7a885a560e) -> 29d902e1c2344e54b3058b7a885a560e
fun UUID.stringUuid(): String =
    toString().let {
        it.substring(0, 8) +
            it.substring(9, 13) +
            it.substring(14, 18) +
            it.substring(19, 23) +
            it.substring(24, 36)
    }

// 29d902e1c2344e54b3058b7a885a560e -> UUID(29d902e1-c234-4e54-b305-8b7a885a560e)
fun String.uuid(): UUID =
    if (length == 32) {
        UUID.fromString(
            "${substring(0, 8)}-${substring(8, 12)}-${substring(12, 16)}-" +
                "${substring(16, 20)}-${substring(20, 32)}")
    } else if (length == 36) {
        UUID.fromString(
            "${substring(0, 8)}-${substring(9, 13)}-${substring(14, 18)}-" +
                "${substring(19, 23)}-${substring(24, 36)}")
    } else {
        throw IllegalArgumentException(this)
    }
