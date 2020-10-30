package orgarif.service

import org.springframework.stereotype.Service
import java.time.*

@Service
class DateService {
    fun now() = Instant.now()
    fun localDateNow(zoneId: ZoneId) = LocalDate.now(zoneId)
    fun localDateTimeNow(zoneId: ZoneId) = LocalDateTime.now(zoneId)
    fun yearMonthNow(zoneId: ZoneId) = YearMonth.now(zoneId)
    fun serverZoneId() = ZoneId.systemDefault()
}
