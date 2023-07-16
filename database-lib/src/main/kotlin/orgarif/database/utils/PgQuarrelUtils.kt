package orgarif.database.utils

import java.nio.file.Files
import java.nio.file.Path
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeFormatterBuilder
import java.time.format.SignStyle
import java.time.temporal.ChronoField.DAY_OF_MONTH
import java.time.temporal.ChronoField.HOUR_OF_DAY
import java.time.temporal.ChronoField.MINUTE_OF_HOUR
import java.time.temporal.ChronoField.MONTH_OF_YEAR
import java.time.temporal.ChronoField.SECOND_OF_MINUTE
import java.time.temporal.ChronoField.YEAR
import mu.KotlinLogging
import orgarif.database.domain.PsqlDatabaseConfiguration

object PgQuarrelUtils {

    private val logger = KotlinLogging.logger {}

    private val formatter: DateTimeFormatter by lazy {
        DateTimeFormatterBuilder()
            .appendValue(YEAR, 4, 10, SignStyle.EXCEEDS_PAD)
            .appendLiteral('-')
            .appendValue(MONTH_OF_YEAR, 2)
            .appendLiteral('-')
            .appendValue(DAY_OF_MONTH, 2)
            .appendLiteral('T')
            .appendValue(HOUR_OF_DAY, 2)
            .appendLiteral(':')
            .appendValue(MINUTE_OF_HOUR, 2)
            .appendLiteral(':')
            .appendValue(SECOND_OF_MINUTE, 2)
            .optionalStart()
            .toFormatter()
    }

    fun generateDiff(
        conf: PsqlDatabaseConfiguration,
        diffConf: PsqlDatabaseConfiguration,
        destinationPath: Path
    ) {
        logger.info {
            "Generate pgquarrel diff between ${conf.databaseName} and ${diffConf.databaseName}"
        }
        // TODO
        if (!conf.password.isNullOrEmpty() || !diffConf.password.isNullOrEmpty()) {
            logger.error { "Can't handle passwords with pgquarrel yet" }
            return
        }
        val commandResult =
            ShellRunner.run(
                "pgquarrel",
                "--source-host=${diffConf.host}",
                "--source-port=${diffConf.port}",
                "--source-dbname=${diffConf.databaseName}",
                "--source-user=${diffConf.user}",
                "--source-no-password",
                "--target-host=${conf.host}",
                "--target-port=${conf.port}",
                "--target-dbname=${conf.databaseName}",
                "--target-user=${conf.user}",
                "--target-no-password")
        if (commandResult.result == 0) {
            val diff = commandResult.output.fold("") { acc, s -> acc + "\n" + s }
            val file =
                destinationPath.resolve("diff_" + formatter.format(LocalDateTime.now()) + ".sql")
            logger.info { "Writing diff to $file" }
            file.toFile().parentFile.mkdirs()
            Files.write(file, diff.toByteArray(Charsets.UTF_8))
        } else {
            logger.error { "Diff failed" }
        }
    }
}
