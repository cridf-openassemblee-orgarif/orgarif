package orgarif.jooq.tools.jooq

import org.jooq.Converter
import java.time.Instant
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset

class TimestampToInstantConverter : Converter<LocalDateTime, Instant> {
    override fun from(d: LocalDateTime?) = d?.toInstant(ZoneOffset.UTC)

    override fun to(d: Instant?) = d?.atOffset(ZoneOffset.UTC)?.toLocalDateTime()

    override fun fromType() = LocalDateTime::class.java

    override fun toType() = Instant::class.java
}