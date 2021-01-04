package orgarif.dbtooling.util

import mu.KotlinLogging
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import kotlin.streams.toList

object ShellRunner {

    private val logger = KotlinLogging.logger {}

    data class CommandResult(val result: Int, val lines: List<String>)

    internal class StreamConsumer(val inputStream: InputStream, val lines: MutableList<String>) : Runnable {
        override fun run() {
            BufferedReader(InputStreamReader(inputStream)).lines().forEach { lines.add(it) }
        }
    }

    fun run(command: String, vararg params: String): CommandResult {
        val builder = ProcessBuilder()
        val fullCommand = command + params.fold("") { acc, s -> "$acc $s" }
        builder.command("sh", "-c", fullCommand)
        val process = builder.start()
        val result = process.waitFor()
        val lines = BufferedReader(InputStreamReader(process.inputStream)).lines().toList()
        logger.debug { "Run '$fullCommand' => $result" }
        return CommandResult(result, lines)
    }
}