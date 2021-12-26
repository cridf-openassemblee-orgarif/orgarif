package orgarif.serialization

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class LocalDateSerializer : StdSerializer<LocalDate>(LocalDate::class.java) {

    companion object {
        val formatter = DateTimeFormatter.ISO_LOCAL_DATE
    }

    override fun serialize(value: LocalDate, gen: JsonGenerator, provider: SerializerProvider) {
        gen.writeString(formatter.format(value))
    }
}
