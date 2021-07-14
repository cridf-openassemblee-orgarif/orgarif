package orgarif.jooqlib

import jooqutils.DatabaseConfiguration
import orgarif.jooqlib.utils.SpringLikeYamlConfigUtils
import java.io.FileInputStream
import java.io.InputStream

object Configuration {

    val configuration by lazy {
        val additionalConfig = System.getenv("ORGARIF_DEV_ADDITIONAL_CONFIG")
            ?: ("dev-" + System.getenv("USER"))
        configuration("application-dev.yaml", "application-$additionalConfig.yaml")
    }

    private fun configuration(vararg configurationFiles: String): DatabaseConfiguration {
        val config = SpringLikeYamlConfigUtils
            .yamlFilesToMap(*configurationFiles.map { streamConfigurationFile(it) }.toTypedArray())
        return DatabaseConfiguration(
            DatabaseConfiguration.Driver.psql,
            config.getValue("database.host"),
            config.getValue("database.port").toInt(),
            config.getValue("database.name"),
            config.getValue("database.user"),
            config.getValue("database.password"),
            setOf("public"),
            "/usr/local/bin",
            config.get("pgquarrel")
        )
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