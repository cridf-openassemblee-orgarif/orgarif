package orgarif.config

import java.time.ZoneId

object ApplicationConstants {
    // FIXME remove !
    const val springMvcModelKeyStackTrace = "stackTrace"

    const val resourcesPath = "/static"

    const val applicationMailSenderName = "Mail automatique Orgarif"

    // TODO[orgarif]
    // FIXME mail !
    const val applicationMail = ""

    val parisZoneId = ZoneId.of("Europe/Paris")
}
