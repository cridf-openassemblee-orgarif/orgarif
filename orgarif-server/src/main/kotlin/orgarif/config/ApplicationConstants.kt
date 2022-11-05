package orgarif.config

import java.time.ZoneId

object ApplicationConstants {
    // FIXME[fmk] remove !
    const val springMvcModelKeyStackTrace = "stackTrace"

    // TODO[fmk] /res vs /static
    const val resourcesPath = "/static"

    // TODO[fmk] naming... Monitoring ?
    const val applicationMailSenderName = "Automatic email Orgarif"

    // TODO[orgarif]
    // FIXME[fmk] mail !
    const val applicationMail = ""

    val parisZoneId = ZoneId.of("Europe/Paris")
}
