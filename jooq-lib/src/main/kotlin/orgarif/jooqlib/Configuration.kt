package orgarif.jooqlib

import orgarif.jooqlib.utils.SpringLikeYamlConfigUtils
import java.io.FileInputStream
import java.io.InputStream
import jooqutils.DatabaseConfiguration

object Configuration {

    val configuration by lazy {
        val additionalConfig =
            System.getenv("ORGARIF_DEV_ADDITIONAL_CONFIG") ?: ("dev-" + System.getenv("USER"))
        configuration("application-dev.yaml", "application-$additionalConfig.yaml")
    }

    fun configuration(vararg configurationFiles: String): DatabaseConfiguration {
        val config =
            SpringLikeYamlConfigUtils.yamlFilesToMap(
                *configurationFiles.map { streamConfigurationFile(it) }.toTypedArray())
        val host = config.getValue("database.host")
        val allowRemoteHost =
            System.getenv("ORGARIF_DB_TOOLING_ALLOW_REMOTE_HOST")?.let { it == "true" } ?: false
        // TODO[tmpl] test ip not extension !
        if (host.endsWith(".com") && !allowRemoteHost) {
            throw RuntimeException("Warning run database operations on $host")
        }
        return DatabaseConfiguration(
            DatabaseConfiguration.Driver.psql,
            host,
            config.getValue("database.port").toInt(),
            config.getValue("database.name"),
            config.getValue("database.user"),
            config["database.password"],
            setOf("public"),
            "/usr/local/bin",
            config["pgquarrel"])
    }

    private fun streamConfigurationFile(file: String): InputStream {
        val resourceResolve = GenerateJooqAndDiff.webServerResourcesDir.resolve(file).toFile()
        return if (resourceResolve.exists()) {
            FileInputStream(resourceResolve)
        } else {
            Configuration.javaClass.classLoader.getResourceAsStream(file)
        }
    }
}
