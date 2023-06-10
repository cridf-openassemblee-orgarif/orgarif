package orgarif.database.jooq.converter

import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset
import org.jooq.Converter

class TimestampWithTimeZoneToInstantJooqConverter : Converter<OffsetDateTime, Instant> {
    override fun from(d: OffsetDateTime?) = d?.toInstant()

    override fun to(d: Instant?) = d?.atOffset(ZoneOffset.UTC)

    override fun fromType() = OffsetDateTime::class.java

    override fun toType() = Instant::class.java
}
