package orgarif.config

import orgarif.domain.UserSession
import orgarif.utils.Serializer.deserialize
import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextImpl
import java.util.*

class JsonDeserializingService : Converter<ByteArray, Any> {

    // [doc] pour utiliser le log de bytes :
    // fun byteArrayOfInts(vararg ints: Int) = ByteArray(ints.size) { pos -> ints[pos].toByte() }
    // println(String(byteArrayOfInts(123, 34, ...)))
    override fun convert(source: ByteArray): Any {
        val json = try {
            String(source)
        } catch (e: Exception) {
            throw IllegalArgumentException("Couldn't convert to string ${Arrays.toString(source)}", e)
        }
        return try {
            val session = deserialize<UserSession>(json)
            SecurityContextImpl().apply {
                authentication = UsernamePasswordAuthenticationToken(session, null, null)
            }
        } catch (e: Exception) {
            throw IllegalArgumentException("Couldn't deserialize session $json", e)
        }
    }

}
