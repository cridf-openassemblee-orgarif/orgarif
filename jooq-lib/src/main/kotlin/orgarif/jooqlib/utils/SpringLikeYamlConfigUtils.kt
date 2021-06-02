package orgarif.jooqlib.utils

import com.google.common.io.CharStreams
import org.yaml.snakeyaml.Yaml
import java.io.InputStream
import java.io.InputStreamReader
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

object SpringLikeYamlConfigUtils {

    private val parisZoneId = ZoneId.of("Europe/Paris")

    fun yamlFilesToMap(vararg files: InputStream): Map<String, String> =
        files
            .map { CharStreams.toString(InputStreamReader(it, Charsets.UTF_8)) }
            .map { Yaml().load<Map<String, Any>>(it) }
            .flatMap { flattenConf(it) }
            // we want to delete the duplicates
            // but distinct() will keep the first item for each key, and we want the last
            // so we reverse, distinct, and re-reverse
            .reversed()
            .distinct()
            .reversed()
            // toMap() would have removed the duplicates, but with distinct we're sure of the algorythm
            .toMap()

    private fun flattenConf(map: Map<String, Any>): List<Pair<String, String>> =
        map.keys
            .flatMap { key ->
                val value = map.getValue(key)
                when (value) {
                    null -> listOf(key to "")
                    is Boolean,
                    is Integer,
                    is Long,
                    is String -> listOf(key to "$value")
                    is Map<*, *> -> flattenConf(value as Map<String, Any>)
                        .map {
                            (key + "." + it.first) to it.second
                        }
                    is Date -> listOf(
                        key to DateTimeFormatter.ISO_LOCAL_DATE.format(
                            value.toInstant().atZone(parisZoneId).toLocalDate()
                        )
                    )
                    else -> {
                        listOf(key to "$value")
                    }
                }
            }

}