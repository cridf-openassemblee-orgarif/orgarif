package orgarif.jooqlib

import jooqutils.DatabaseConfiguration
import kotlin.io.path.exists
import kotlin.io.path.inputStream
import orgarif.jooqlib.utils.SpringLikeYamlConfigUtils

object Configuration {

    val configuration by lazy {
        val additionalConfig =
            System.getenv("ORGARIF_DEV_ADDITIONAL_CONFIG") ?: ("dev-" + System.getenv("USER"))
        configuration("application-dev.yaml", "application-$additionalConfig.yaml")
    }

    private fun configuration(vararg configurationFiles: String): DatabaseConfiguration {
        val config =
            SpringLikeYamlConfigUtils.yamlFilesToMap(
                *configurationFiles
                    .mapNotNull {
                        GenerateJooqAndDiff.webServerResourcesDir.resolve(it).let {
                            if (it.exists()) it.inputStream() else null
                        }
                    }
                    .toTypedArray())
        val host = config.getValue("database.host")
        val allowRemoteHost = System.getenv("ORGARIF_DB_TOOLING_ALLOW_REMOTE_HOST") == "true"
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
}
