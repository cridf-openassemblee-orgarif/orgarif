package orgarif.util

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.server.ResponseStatusException
import java.util.*

object ResponseUtilKt {
    fun <X> wrapOrNotFound(maybeResponse: Optional<X>) =
        wrapOrNotFound(maybeResponse, null as HttpHeaders?)

    fun <X> wrapOrNotFound(maybeResponse: Optional<X>, header: HttpHeaders?) =
        maybeResponse
            .map { response: X -> (ResponseEntity.ok().headers(header)).body(response) }
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND) }
}
