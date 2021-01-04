package orgarif.jooq.tools.jooq

import org.jooq.Converter
import java.util.*

class CharToUUIDConverter : Converter<String, UUID> {
    override fun from(t: String?) = t?.let {
        UUID.fromString("${it.substring(0, 8)}-${it.substring(8, 12)}-${it.substring(12, 16)}-" +
                "${it.substring(16, 20)}-${it.substring(20)}")
    }

    override fun to(u: UUID?): String? = u?.toString()?.replace("-", "")

    override fun fromType() = String::class.java

    override fun toType() = UUID::class.java
}