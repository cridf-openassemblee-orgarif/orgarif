package orgarif.service

import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.YearMonth
import java.time.ZoneId
import org.springframework.stereotype.Service

@Service
class DateService {
    fun now() = Instant.now()
    fun localDateNow(zoneId: ZoneId) = LocalDate.now(zoneId)
    fun localDateTimeNow(zoneId: ZoneId) = LocalDateTime.now(zoneId)
    fun yearMonthNow(zoneId: ZoneId) = YearMonth.now(zoneId)
    fun serverZoneId() = ZoneId.systemDefault()
}
