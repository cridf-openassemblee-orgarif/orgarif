package orgarif.serialization

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import java.time.LocalDate
import java.time.format.DateTimeParseException
import orgarif.error.OrgarifSerializationLocalDateException

class LocalDateDeserializer : StdDeserializer<LocalDate>(LocalDate::class.java) {

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): LocalDate =
        try {
            LocalDate.parse(p.valueAsString, LocalDateSerializer.formatter)
        } catch (e: DateTimeParseException) {
            throw OrgarifSerializationLocalDateException(p.valueAsString)
        }
}
