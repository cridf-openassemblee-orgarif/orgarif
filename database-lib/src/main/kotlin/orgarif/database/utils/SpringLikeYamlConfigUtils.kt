package orgarif.database.utils

import java.io.InputStream
import org.yaml.snakeyaml.Yaml

object SpringLikeYamlConfigUtils {

    /**
     * Config here is String only to simplify the code. It's far from perfect though.
     *
     * We want a Map of potential null values, because we want to use getValue ; if a value is null,
     * it must have been defined null. Nullity should not be the result of the absence of the asked
     * key
     */
    class ConfigMap(val map: Map<String, String?>) : Map<String, String?> by map {

        @Deprecated(
            level = DeprecationLevel.ERROR,
            message = "Always use getValue on ConfigMap",
            replaceWith = ReplaceWith("getValue()"))
        override fun get(key: String): Nothing = throw UnsupportedOperationException()

        /** Throws if missing key in configuration, throws if value is null */
        fun getValue(key: String): String =
            requireNotNull(map.getValue(key)) { "Value for key \"$key\" is null" }

        /** Throws if missing key in configuration */
        fun getValueOrNull(key: String): String? = map.getValue(key)
    }

    fun yamlFilesToMap(vararg file: InputStream): ConfigMap =
        yamlToMap(*file.map { String(it.readAllBytes()) }.toTypedArray())

    fun yamlToMap(vararg yaml: String): ConfigMap = ConfigMap(yamlFilesToPairs(*yaml).toMap())

    private fun yamlFilesToPairs(vararg yaml: String): List<Pair<String, String?>> =
        yaml
            .map { Yaml().load<Map<String, Any>>(it) }
            .flatMap { flattenConf(it) }
            // we want to delete the duplicates
            // but distinct() will keep the first item for each key, and we want the last,
            // so we reverse, distinct, and re-reverse
            .reversed()
            // toMap() would have removed the duplicates, but with distinct we're sure of the order
            .distinct()
            .reversed()
            // replace system env vars
            .map { (key, value) ->
                key to
                    // TODO[tmpl] write tests (with 2 vars in string, with missing var...)
                    value
                        ?.replace("\\$\\{[^}]*}".toRegex()) {
                            System.getenv(it.value.drop(2).dropLast(1)) ?: ""
                        }
                        ?.ifEmpty { null }
            }

    private fun flattenConf(map: Map<String, Any?>): List<Pair<String, String?>> =
        map.keys.flatMap { key ->
            when (val value = map.getValue(key)) {
                null -> listOf(key to null)
                is Boolean,
                is Int,
                is Long,
                is String -> listOf(key to "$value")
                is Map<*, *> -> {
                    @Suppress("UNCHECKED_CAST") val m = value as Map<String, Any?>
                    flattenConf(m).map { (key + "." + it.first) to it.second }
                }
                // TODO or just return listOf(key to "$value") ?
                else -> throw NotImplementedError("Not implemented type : ${value::class}")
            }
        }
}
