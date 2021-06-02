package nodes

import com.google.common.io.Files
import orgarif.OrgarifApplication
import java.nio.file.Paths
import java.util.*

fun main(args: Array<String>) {
    fun write(destFile: String, vararg files: String) {
        val properties = Properties().apply {
            files.forEach { file ->
                load(OrgarifApplication::javaClass.javaClass.classLoader.getResourceAsStream(file))
            }
        }
        val flattenConf = properties.keys.map { it.toString() to properties.get(it).toString() }
        val sb = StringBuffer()
        flattenConf.sortedBy { it.first }.forEach {
            sb.append("${it.first}=${it.second}\n")
        }
        Files.write(
            sb.toString().toByteArray(Charsets.UTF_8),
            Paths.get("${System.getProperty("user.dir")}/$destFile.txt").toFile()
        )
    }
    write("application", "application.properties")
    write("dev", "application-dev.properties")
    write("dev-mlo", "application-dev-mlo.properties")
    write("staging", "application-staging.properties")
    write("prod", "application-prod.properties")
    write("test", "application-test.properties")
    write("fulldevmlo", "application.properties", "application-dev.properties", "application-dev-mlo.properties")
    write("fullprod", "application.properties", "application-prod.properties")
}