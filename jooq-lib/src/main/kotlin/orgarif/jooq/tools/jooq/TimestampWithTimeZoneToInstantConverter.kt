package orgarif.jooq.tools.jooq

import org.jooq.Converter
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset

class TimestampWithTimeZoneToInstantConverter : Converter<OffsetDateTime, Instant> {
    override fun from(d: OffsetDateTime?) = d?.toInstant()

    override fun to(d: Instant?) = d?.atOffset(ZoneOffset.UTC)

    override fun fromType() = OffsetDateTime::class.java

    override fun toType() = Instant::class.java
}