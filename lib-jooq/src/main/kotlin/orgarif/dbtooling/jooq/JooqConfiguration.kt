package orgarif.dbtooling.jooq

import com.mysql.cj.jdbc.Driver
import org.jooq.codegen.GeneratorStrategy
import org.jooq.meta.jaxb.*
import org.jooq.meta.jaxb.Target
import org.jooq.meta.mysql.MySQLDatabase
import org.jooq.meta.postgres.PostgresDatabase
import orgarif.jooq.tools.Config
import orgarif.jooq.tools.jooq.CharToUUIDConverter
import javax.annotation.Nonnull
import javax.annotation.Nullable
import kotlin.reflect.KClass

// TODO[db-tooling] use Config or parameters ?
object JooqConfiguration {
    // TODO[db-tooling] simplify now !
    fun generateConfiguration(databaseName: String,
                              schemas: Set<String>,
                              excludeTables: Set<String>,
                              generatorClass: KClass<out org.jooq.codegen.Generator>? = null,
                              generatedPackageName: String? = null,
                              generatedCodePath: String? = null,
                              generatorStrategyClass: KClass<out GeneratorStrategy>? = null) =
            Configuration()
                    .withJdbc(Jdbc()
                            .withDriver(when (Config.driver) {
                                Config.Driver.psql -> TODO()
                                Config.Driver.mysql -> Driver::class.java.name
                            })
                            .withUrl(when (Config.driver) {
                                Config.Driver.psql -> "jdbc:postgresql://localhost/$databaseName"
                                Config.Driver.mysql -> "jdbc:mysql://localhost/$databaseName?serverTimezone=UTC"
                            })
                            .withUser(Config.localUser)
                            .withPassword(""))
                    .withGenerator(Generator()
                            .apply {
                                if (generatorClass != null) {
                                    withName(generatorClass.java.name)
                                }
                            }
                            .withDatabase(Database()
                                    .withName(when (Config.driver) {
                                        Config.Driver.psql -> PostgresDatabase::class.java.name
                                        Config.Driver.mysql -> MySQLDatabase::class.java.name
                                    })
                                    .withIncludes(".*")
                                    .withExcludes(excludeTables.joinToString(separator = "|"))
                                    .apply {
                                        if (schemas.isNotEmpty()) {
                                            withSchemata(schemas
                                                    .map { SchemaMappingType().withInputSchema(it) })
                                        }
                                    }
                                    .apply {
                                        if (Config.driver == Config.Driver.mysql) {
                                            withForcedTypes(
                                                    ForcedType().apply {
                                                        userType = java.util.UUID::class.java.name
                                                        includeTypes = "CHAR\\(32\\)"
                                                        includeExpression = ".*\\.*id\$"
                                                        converter = CharToUUIDConverter::class.java.name
                                                    },
                                                    ForcedType().apply {
                                                        name = "BOOLEAN"
                                                        includeTypes = "(?i:TINYINT\\(1\\))"
                                                    }
                                            )
                                        }
                                    }

                            )
                            .apply {
                                if (generatorStrategyClass != null) {
                                    withStrategy(Strategy()
                                            .withName(generatorStrategyClass.java.name)
                                    )
                                }
                            }
                            .apply {
                                if (generatedPackageName != null || generatedCodePath != null) {
                                    if (generatedPackageName == null || generatedCodePath == null) {
                                        throw IllegalArgumentException("generatedPackageName and generatedCodePath must be both null or not null")
                                    }
                                    withTarget(Target()
                                            .withPackageName("orgarif.$generatedPackageName.generated")
                                            .withDirectory(generatedCodePath)
                                    )
                                }
                            }
                            .withGenerate(Generate().apply {
                                isNullableAnnotation = true
                                nullableAnnotationType = Nullable::class.java.name
                                isNonnullAnnotation = true
                                nonnullAnnotationType = Nonnull::class.java.name
                            })
                    )
}