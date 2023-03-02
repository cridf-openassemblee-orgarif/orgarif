package orgarif.tooling.kttots

import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.readText
import org.json.JSONObject

// TODO[tmpl] final command for prettier
data class KtToTsConfiguration(
    val clientDirectory: Path,
    val srcDirectory: Path,
    // TODO naming directory with isn't a Path
    val generatedDirectory: String,
    val dropPackage: String,
    // for classes from the jdk that will be "emulated" in js
    // => Duration, LocalDate, etc...
    // if missing, print a warning
    // and use any in generated code? or a nominalString
    // create a @KtToTsConfiguration ?
    // => not simple, project code can't be run here
    // try to extend from gradle ?
    // TODO naming
    val mappings: Map<String, String>,
    // config, or an annotation
    val nominalStringMappings: Set<String>,
    // where is my nominal-string. If not present but needed, generate it
    val nominalStringImport: String?,
    // interfaces i want as type = all subtypes
    val interfaceAsTypes: Set<String>,
    val debugFile: File?
) {
    companion object {
        fun init(options: Map<String, String>): KtToTsConfiguration {
            val destination =
                options["ktToTs:clientDirectory"]?.let { Paths.get(it) }
                    ?: throw IllegalArgumentException()
            return KtToTsConfiguration(
                clientDirectory = destination,
                srcDirectory = destination.resolve(options["ktToTs:srcDirectory"] ?: "src"),
                generatedDirectory = options["ktToTs:generatedDirectory"] ?: "generated",
                dropPackage = options["ktToTs:dropPackage"] ?: "",
                mappings =
                    options["ktToTs:mappings"]?.let {
                        Paths.get(it).readText().let {
                            JSONObject(it).toMap().mapValues { e -> e.value.toString() }
                        }
                    }
                        ?: emptyMap(),
                nominalStringMappings =
                    options["ktToTs:nominalStringMappings"]?.let { it.split("|").toSet() }
                        ?: emptySet(),
                nominalStringImport = options["ktToTs:nominalStringImport"],
                // TODO[tmpl]
                interfaceAsTypes = emptySet(),
                // TODO use instead of temp dir ?
                debugFile = options["ktToTs:debugFile"]?.let { Paths.get(it).toFile() })
        }
    }
}
