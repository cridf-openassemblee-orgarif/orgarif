package orgarif.config

import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextImpl
import orgarif.domain.Session
import orgarif.utils.Serializer.serialize

class JsonSerializingService : Converter<Any, ByteArray> {

    override fun convert(source: Any) =
            if (source is SecurityContextImpl && source.authentication is UsernamePasswordAuthenticationToken) {
                if (source.authentication.principal is Session) {
                    serialize(source.authentication.principal).toByteArray()
                } else {
                    throw IllegalArgumentException("Unexpected session : ${source.authentication.principal}")
                }
            } else {
                throw IllegalArgumentException("Unexpected session : $source")
            }

}
