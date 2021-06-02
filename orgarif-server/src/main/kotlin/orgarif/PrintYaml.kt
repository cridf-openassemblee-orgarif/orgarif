package nodes

import orgarif.jooqlib.utils.SpringLikeYamlConfigUtils
import com.google.common.io.Files
import orgarif.OrgarifApplication
import java.nio.file.Paths

fun main(args: Array<String>) {
    fun write(destFile: String, vararg files: String) {
        val sb = StringBuffer()
        val conf = SpringLikeYamlConfigUtils.yamlFilesToMap(*files
            .map { OrgarifApplication.javaClass.classLoader.getResourceAsStream(it) }
            .toTypedArray())
        conf.keys.sorted().forEach {
            sb.append("$it=${conf.getValue(it)}\n")
        }
        Files.write(
            sb.toString().toByteArray(Charsets.UTF_8),
            Paths.get("${System.getProperty("user.dir")}/$destFile.txt").toFile()
        )
    }
    write("application", "application.yaml")
    write("dev", "application-dev.yaml")
    write("dev-mlo", "application-dev-mlo.yaml")
    write("prod", "application-prod.yaml")
    write("staging", "application-staging.yaml")
    write("test", "application-test.yaml")
    write("fulldevmlo", "application.yaml", "application-dev.yaml", "application-dev-mlo.yaml")
    write("fullprod", "application.yaml", "application-prod.yaml")
}
