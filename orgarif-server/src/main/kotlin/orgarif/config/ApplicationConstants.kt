package orgarif.config

import java.time.ZoneId

object ApplicationConstants {
    // FIXME remove !
    const val springMvcModelKeyStackTrace = "stackTrace"

    // TODO /res vs /static
    const val resourcesPath = "/static"

    // TODO naming... Monitoring ?
    const val applicationMailSenderName = "Automatic email Orgarif"

    // TODO[orgarif]
    // FIXME mail !
    const val applicationMail = ""

    val parisZoneId = ZoneId.of("Europe/Paris")
}
