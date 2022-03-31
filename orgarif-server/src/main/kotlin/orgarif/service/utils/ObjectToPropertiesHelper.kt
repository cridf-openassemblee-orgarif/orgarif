package orgarif.service.utils

import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneId
import java.util.UUID
import org.jetbrains.annotations.TestOnly
import orgarif.utils.OrgarifStringUtils

object ObjectToPropertiesHelper {

    fun defaultExclusions(value: Any, path: String) =
        when (value) {
            else -> emptyList<String>()
        }.map { "$path.$it" }

    fun transform(
        value: Any?,
        path: String,
        forcedExclusions: List<String>? = null,
        depth: Int = 0
    ): List<Pair<String, String>> {
        if (value == null) {
            return listOf(path to "null")
        }
        val exclusions = forcedExclusions ?: defaultExclusions(value, path)
        return when (value) {
            is String,
            is Boolean,
            is Int,
            is Double,
            is Enum<*>,
            is LocalDate,
            is LocalTime,
            is ZoneId -> listOf(path to value.toString())
            is UUID -> listOf(path to OrgarifStringUtils.serializeUuid(value))
            is List<*> ->
                value
                    .mapIndexed { index, value ->
                        transform(value, "$path[$index]", exclusions, depth + 1)
                    }
                    .flatten()
            is Map<*, *> ->
                value.toList().flatMap {
                    transform(it.second, "$path.${it.first}", exclusions, depth + 1)
                }
            else -> {
                if (depth > 5) {
                    throw RuntimeException(
                        "Can't convert object to properties, max depth reached, failed at $path ${value::class}")
                }
                transformObject(value, path, exclusions, depth + 1)
            }
        }
    }

    private fun transformObject(
        obj: Any,
        rootPath: String,
        exceptions: List<String> = emptyList(),
        depth: Int = 0
    ): List<Pair<String, String>> {
        val info = obj.javaClass.declaredFields
        return info
            .filter {
                //                    "$path.${it.name}" !in exceptions
                //                    if(it.name == "phaseConsumptions") {
                //                        println(exceptions)
                //                    }
                val path = "$rootPath.${it.name}"
                path !in exceptions
            }
            .flatMap { field ->
                val path = "$rootPath.${field.name}"
                field.isAccessible = true
                val value = field.get(obj)
                //                    if (value == null) {
                //                        listOf(path + "." + pd.name to "null")
                //                    } else {
                transform(value, path, exceptions, depth)
                //                    }
            }
    }

    fun asPrintableString(properties: Map<String, String>) =
        properties.map { (key, value) -> "  ${key}: ${value}" }.reduce { acc, s -> "$acc\n$s" }

    @TestOnly
    fun prepareTest(properties: List<Pair<String, String>>) =
        properties.map { (key, value) -> "  \"${key}\" to \"${value}\"," }.reduce { acc, s ->
            "$acc\n$s"
        }
}
