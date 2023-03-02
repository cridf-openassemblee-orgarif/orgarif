package orgarif.serialization

import orgarif.domain.Prefix
import orgarif.domain.OrgarifId
import orgarif.domain.OrgarifSecurityString
import kotlin.reflect.KClass

object OrgarifSerializationPrefixUtils {

    fun prefix(value: OrgarifId<*>) = extractPrefix(value::class)

    fun prefix(value: OrgarifSecurityString) = extractPrefix(value::class)

    private fun extractPrefix(itemClass: KClass<*>) =
        itemClass.annotations.mapNotNull { it as? Prefix }.firstOrNull()?.value?.let { it + "_" }
            ?: ""

    fun removePrefix(itemClass: KClass<*>, value: String) =
        itemClass.annotations
            .mapNotNull { it as? Prefix }
            .firstOrNull()
            ?.value
            ?.let { prefix ->
                if (!value.startsWith(prefix)) {
                    throw IllegalArgumentException(
                        "Missing id prefix $prefix on $itemClass : $value")
                }
                value.substring(prefix.length + 1)
            }
            ?: value
}
