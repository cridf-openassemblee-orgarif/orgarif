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
