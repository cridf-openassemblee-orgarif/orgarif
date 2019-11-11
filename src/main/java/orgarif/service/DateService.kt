package orgarif.service

import org.springframework.stereotype.Service
import java.time.Instant

@Service
open class DateService {

    open fun now() = Instant.now()

}
