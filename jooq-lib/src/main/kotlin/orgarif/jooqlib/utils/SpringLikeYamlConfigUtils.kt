package orgarif.jooqlib.utils

import com.google.common.io.CharStreams
import java.io.InputStream
import java.io.InputStreamReader
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Date
import org.yaml.snakeyaml.Yaml

object SpringLikeYamlConfigUtils {

    private val parisZoneId = ZoneId.of("Europe/Paris")

    fun yamlFilesToMap(vararg files: InputStream): Map<String, String> =
        yamlFilesToPairs(*files)
            .mapNotNull { pair -> pair.second?.let { pair.first to it } }
            .toMap()

    // FIXME[tmpl] we can debug with this one
    fun yamlFilesToMapComplete(vararg files: InputStream): Map<String, String?> =
        yamlFilesToPairs(*files).toMap()

    private fun yamlFilesToPairs(vararg files: InputStream): List<Pair<String, String?>> =
        files
            .map { CharStreams.toString(InputStreamReader(it, Charsets.UTF_8)) }
            .map { Yaml().load<Map<String, Any>>(it) }
            .flatMap { flattenConf(it) }
            // we want to delete the duplicates
            // but distinct() will keep the first item for each key, and we want the last
            // so we reverse, distinct, and re-reverse
            .reversed()
            // toMap() would have removed the duplicates, but with distinct we're sure of the order
            .distinct()
            .reversed()
            // replace system env vars
            .map {
                it.first to
                    // TODO[tmpl] write tests (with 2 vars in string, with missing var...)
                    it.second
                        ?.replace("\\$\\{[^}]*}".toRegex()) {
                            System.getenv(it.value.drop(2).dropLast(1)) ?: ""
                        }
                        ?.let { it.ifEmpty { null } }
            }

    private fun flattenConf(map: Map<String, Any>): List<Pair<String, String?>> =
        map.keys.flatMap { key ->
            val value = map.getValue(key)
            when (value) {
                // TODO[tmpl] null or not here ?? (if use getValue is useless)
                null -> listOf(key to null)
                is Boolean,
                is Int,
                is Long,
                is String -> listOf(key to "$value")
                is Map<*, *> ->
                    flattenConf(value as Map<String, Any>).map {
                        (key + "." + it.first) to it.second
                    }
                is Date ->
                    listOf(
                        key to
                            DateTimeFormatter.ISO_LOCAL_DATE.format(
                                value.toInstant().atZone(parisZoneId).toLocalDate()))
                else -> listOf(key to "$value")
            }
        }
}
