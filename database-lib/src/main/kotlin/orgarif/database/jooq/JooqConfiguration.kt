package orgarif.database.jooq

import java.nio.file.Path
import java.time.Instant
import kotlin.reflect.KClass
import org.jooq.codegen.GeneratorStrategy
import org.jooq.codegen.KotlinGenerator
import org.jooq.meta.jaxb.Configuration
import org.jooq.meta.jaxb.Database
import org.jooq.meta.jaxb.ForcedType
import org.jooq.meta.jaxb.Generate
import org.jooq.meta.jaxb.Generator
import org.jooq.meta.jaxb.Jdbc
import org.jooq.meta.jaxb.SchemaMappingType
import org.jooq.meta.jaxb.Strategy
import org.jooq.meta.jaxb.Target
import org.jooq.meta.postgres.PostgresDatabase
import org.postgresql.Driver
import orgarif.database.domain.PsqlDatabaseConfiguration
import orgarif.database.jooq.converter.TimestampToInstantJooqConverter
import orgarif.database.jooq.converter.TimestampWithTimeZoneToInstantJooqConverter

object JooqConfiguration {
    fun generateConfiguration(
        conf: PsqlDatabaseConfiguration,
        excludeTables: Set<String>,
        generatedPackageName: String? = null,
        generatedCodePath: Path? = null,
        generatorStrategyClass: KClass<out GeneratorStrategy>? = null
    ): Configuration =
        Configuration()
            .withJdbc(
                Jdbc()
                    .withDriver(Driver::class.qualifiedName)
                    .withUrl(conf.jdbcUrl())
                    .withUser(conf.user)
                    .withPassword(conf.password))
            .withGenerator(
                Generator()
                    .withName(KotlinGenerator::class.java.name)
                    .withDatabase(
                        Database()
                            .withName(PostgresDatabase::class.java.name)
                            .withIncludes(".*")
                            .withExcludes(excludeTables.joinToString(separator = "|"))
                            .withSchemata(SchemaMappingType().withInputSchema(conf.schema))
                            .apply {
                                val timeStampForcedType =
                                    ForcedType().apply {
                                        userType = Instant::class.java.name
                                        includeTypes = "TIMESTAMP"
                                        converter = TimestampToInstantJooqConverter::class.java.name
                                    }
                                val timestampWithTimeZoneForcedType =
                                    ForcedType().apply {
                                        userType = Instant::class.java.name
                                        includeTypes = "TIMESTAMP\\ WITH\\ TIME\\ ZONE"
                                        converter =
                                            TimestampWithTimeZoneToInstantJooqConverter::class
                                                .java
                                                .name
                                    }
                                withForcedTypes(
                                    listOf(timeStampForcedType, timestampWithTimeZoneForcedType))
                            })
                    .apply {
                        if (generatorStrategyClass != null) {
                            withStrategy(Strategy().withName(generatorStrategyClass.java.name))
                        }
                    }
                    .apply {
                        if (generatedPackageName != null || generatedCodePath != null) {
                            if (generatedPackageName == null || generatedCodePath == null) {
                                throw IllegalArgumentException(
                                    "generatedPackageName and generatedCodePath must be both null or not null")
                            }
                            withTarget(
                                Target()
                                    .withPackageName("$generatedPackageName.generated")
                                    .withDirectory(generatedCodePath.toFile().absolutePath))
                        }
                    }
                    .withGenerate(Generate().apply { isKotlinNotNullRecordAttributes = true }))
}
