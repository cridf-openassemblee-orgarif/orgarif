package orgarif.tooling.kttots

import java.nio.file.Path

object ShellRunner {

    fun launch(directory: Path, command: String, vararg params: String) {
        val builder = ProcessBuilder()
        builder.directory(directory.toFile())
        val fullCommand = command + params.fold("") { acc, s -> "$acc $s" }
        builder.command("sh", "-c", fullCommand)
        builder.start()
    }
}
