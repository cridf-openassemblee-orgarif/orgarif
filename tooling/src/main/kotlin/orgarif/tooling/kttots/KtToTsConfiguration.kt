package orgarif.tooling.kttots

import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.readText
import org.json.JSONObject

// TODO final command pour prettier
data class KtToTsConfiguration(
    val clientDirectory: Path,
    val srcDirectory: Path,
    val generatedDirectory: Path,
    // pour les trucs de la JVM que je veux moi-même mettre dans codebase
    // => Duration, LocalDate, etc...
    // sinon t'as un warning et il met un any dans le code
    // ou une nominalString
    // possibilité d'un @KtToTsConfiguration ?
    // => pas évident car code du projet ne peut vraisemblablement pas être runné ici
    // il faudrait pouvoir étendre dans le gradle
    val mappings: Map<String, String>,
    // config ça ou alors faire une annotation
    val nominalStringMappings: Set<String>,
    // where is my nominal-string. If pas présent mais needed, le genere
    val nominalStringImport: String?,
    // liste des interface dont je veux faire un type = avec tous les subtypes
    val interfaceAsTypes: Set<String>,
    val debugFile: File?
) {
    companion object {
        fun init(options: Map<String, String>): KtToTsConfiguration {
            val destination =
                options["ktToTs:clientDirectory"]?.let { Paths.get(it) }
                    ?: throw IllegalArgumentException()
            val srcDirectory = destination.resolve(options["ktToTs:srcDirectory"] ?: "src")
            val generatedDirectory =
                destination.resolve(options["ktToTs:generatedDirectory"] ?: "src/generated")
            return KtToTsConfiguration(
                destination,
                srcDirectory,
                generatedDirectory,
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
                // TODO
                interfaceAsTypes = emptySet(),
                debugFile = options["ktToTs:debugFile"]?.let { Paths.get(it).toFile() })
        }
    }
}
