package orgarif.tooling.kttots

import java.io.BufferedReader
import java.io.InputStreamReader
import java.nio.file.Path
import mu.KotlinLogging

object ShellRunner {

    data class CommandResult(
        val result: Int,
        val output: List<String>,
        val errorOutput: List<String>
    )

    private val logger = KotlinLogging.logger {}

    fun run(command: String, vararg params: String): CommandResult = doRun(null, command, *params)

    fun run(directory: Path, command: String, vararg params: String): CommandResult =
        doRun(directory, command, *params)

    private fun doRun(directory: Path?, command: String, vararg params: String): CommandResult {
        val builder =
            ProcessBuilder().apply {
                environment().apply {
                    val addToPath = listOf("/usr/local/bin")
                    put("PATH", "${get("PATH")}:${addToPath.joinToString(separator = ":")}")
                }
                if (directory != null) {
                    directory(directory.toFile())
                }
            }
        val fullCommand = command + params.fold("") { acc, s -> "$acc $s" }
        logger.debug { "Run '$fullCommand'" }
        builder.command("sh", "-c", fullCommand)
        val process = builder.start()
        val output =
            BufferedReader(InputStreamReader(process.inputStream)).lines().map {
                logger.debug { "Command output: $it" }
                it
            }
        val errorOutput =
            BufferedReader(InputStreamReader(process.errorStream)).lines().map {
                logger.debug { "Command error: $it" }
                it
            }
        val result = process.waitFor()
        logger.debug { "Command result: $result" }
        return CommandResult(result, output.toList(), errorOutput.toList())
    }
}
